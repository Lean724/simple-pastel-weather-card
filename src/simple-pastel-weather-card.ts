import { LitElement, PropertyValues, TemplateResult, css, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import {
  ForecastSubscriptionManager,
  computeAdaptiveForecastCount,
  formatForecastLabel,
} from './forecast';
import {
  ActionGestureController,
  buildThemeInlineStyle,
  computeGridOptions,
  fireHassAction,
  hasAnyAction,
  isValidWeatherCondition,
  resolveCardActionConfig,
  resolveWeatherData,
} from './helpers';
import { IconCondition, renderWeatherIcon } from './icons/weather-icons';
import { localize, resolveLanguage } from './localize/localize';
import {
  ActionTrigger,
  DEFAULT_CONFIG,
  ForecastEntry,
  HomeAssistant,
  LovelaceCard,
  LovelaceGridOptions,
  Orientation,
  ResolvedStatItem,
  ResolvedWeatherData,
  SimplePastelWeatherCardConfig,
  SupportedLanguage,
} from './types';
import './editor';

@customElement('simple-pastel-weather-card')
export class SimplePastelWeatherCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config: SimplePastelWeatherCardConfig = {
    type: 'custom:simple-pastel-weather-card',
    ...DEFAULT_CONFIG,
  };
  @state() private _forecast: ForecastEntry[] = [];
  @state() private _forecastLoading = false;
  @state() private _forecastError = false;
  @state() private _containerWidth = 480;
  @state() private _containerHeight = 120;

  private _forecastManager = new ForecastSubscriptionManager();
  private _gestureController = new ActionGestureController();
  private _resizeObserver?: ResizeObserver;
  private _observedElement?: Element;

  public static getConfigElement(): HTMLElement {
    return document.createElement('simple-pastel-weather-card-editor');
  }

  public static getStubConfig(hass?: HomeAssistant): SimplePastelWeatherCardConfig {
    const weatherEntity = hass?.states
      ? Object.keys(hass.states).find((id) => id.startsWith('weather.'))
      : undefined;
    return {
      type: 'custom:simple-pastel-weather-card',
      ...(weatherEntity ? { entity: weatherEntity } : {}),
      ...DEFAULT_CONFIG,
    };
  }

  public setConfig(config: SimplePastelWeatherCardConfig): void {
    if (!config) {
      throw new Error('Invalid configuration');
    }
    this._config = {
      ...DEFAULT_CONFIG,
      ...config,
    };
  }

  public getGridOptions(): LovelaceGridOptions {
    return computeGridOptions(this._config);
  }

  public getCardSize(): number {
    const orientation: Orientation = this._config.orientation ?? 'horizontal';
    const showForecast = Boolean(this._config.show_forecast);
    if (orientation === 'vertical') {
      return showForecast ? 4 : 2;
    }
    return showForecast ? 2 : 1;
  }

  public connectedCallback(): void {
    super.connectedCallback();
    this._setupResizeObserver();
    void this._syncForecastSubscription();
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    this._teardownResizeObserver();
    this._gestureController.destroy();
    void this._forecastManager.destroy();
  }

  protected firstUpdated(): void {
    this._setupResizeObserver();
  }

  protected updated(changedProps: PropertyValues): void {
    super.updated(changedProps);
    if (changedProps.has('_config') || changedProps.has('hass')) {
      void this._syncForecastSubscription();
    }
  }

  private _setupResizeObserver(): void {
    const target = this.shadowRoot?.querySelector('ha-card');
    if (!target || typeof ResizeObserver === 'undefined') return;
    if (this._observedElement === target && this._resizeObserver) return;

    this._teardownResizeObserver();
    this._observedElement = target;
    this._resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const nextWidth = Math.round(entry.contentRect.width);
        const nextHeight = Math.round(entry.contentRect.height);
        if (nextWidth > 0 && nextWidth !== this._containerWidth) {
          this._containerWidth = nextWidth;
        }
        if (nextHeight > 0 && nextHeight !== this._containerHeight) {
          this._containerHeight = nextHeight;
        }
      }
    });
    this._resizeObserver.observe(target);
  }

  private _teardownResizeObserver(): void {
    this._resizeObserver?.disconnect();
    this._resizeObserver = undefined;
    this._observedElement = undefined;
  }

  private async _syncForecastSubscription(): Promise<void> {
    const enabled = Boolean(this._config.show_forecast && this._config.entity?.trim());
    const forecastType = this._config.forecast_type ?? 'daily';
    const entityId = this._config.entity?.trim();

    await this._forecastManager.sync(this.hass, entityId, forecastType, enabled, {
      onData: (items) => {
        this._forecastError = false;
        this._forecast = items;
      },
      onError: () => {
        this._forecastError = true;
        this._forecast = [];
      },
      onLoading: (loading) => {
        this._forecastLoading = loading;
      },
    });
  }

  private get _lang(): SupportedLanguage {
    const hassLang = this.hass?.locale?.language || this.hass?.language;
    return resolveLanguage(hassLang);
  }

  private _t(key: string): string {
    return localize(key, this._lang);
  }

  private _isEventFromInteractiveStat(ev: Event): boolean {
    const path = ev.composedPath?.() ?? [];
    for (const node of path) {
      if (
        node instanceof Element &&
        node.classList?.contains('stat-item') &&
        node.classList?.contains('interactive')
      ) {
        return true;
      }
    }
    const target = ev.target as Element | null;
    return Boolean(target?.closest?.('.stat-item.interactive'));
  }

  private _handleCardAction = (action: ActionTrigger): void => {
    const actionConfig = resolveCardActionConfig(this._config);
    fireHassAction(this, actionConfig, action);
  };

  private _onCardPointerDown = (ev: PointerEvent): void => {
    if (this._isEventFromInteractiveStat(ev)) return;
    const actionConfig = resolveCardActionConfig(this._config);
    if (!hasAnyAction(actionConfig)) return;
    this._gestureController.handlePointerDown(ev, 'card', actionConfig, this._handleCardAction);
  };

  private _onCardPointerMove = (ev: PointerEvent): void => {
    if (this._isEventFromInteractiveStat(ev)) return;
    this._gestureController.handlePointerMove(ev, 'card');
  };

  private _onCardPointerUp = (ev: PointerEvent): void => {
    if (this._isEventFromInteractiveStat(ev)) return;
    const actionConfig = resolveCardActionConfig(this._config);
    if (!hasAnyAction(actionConfig)) return;
    this._gestureController.handlePointerUp(ev, 'card', actionConfig, this._handleCardAction);
  };

  private _onCardPointerCancel = (): void => {
    this._gestureController.handlePointerCancel('card');
  };

  private _onCardContextMenu = (ev: Event): void => {
    if (this._isEventFromInteractiveStat(ev)) return;
    const actionConfig = resolveCardActionConfig(this._config);
    this._gestureController.handleContextMenu(ev, 'card', actionConfig);
  };

  private _onCardKeyDown = (ev: KeyboardEvent): void => {
    if (this._isEventFromInteractiveStat(ev)) return;
    if (ev.key !== 'Enter' && ev.key !== ' ') return;
    const actionConfig = resolveCardActionConfig(this._config);
    if (!hasAnyAction(actionConfig)) return;
    ev.preventDefault();
    this._handleCardAction('tap');
  };

  private _renderStatItem(stat: ResolvedStatItem, compact: boolean): TemplateResult {
    const key = `stat-${stat.index}`;
    const interactive = hasAnyAction(stat.actionConfig);

    const onAction = (action: ActionTrigger) => {
      fireHassAction(this, stat.actionConfig, action);
    };

    return html`
      <div
        class="stat-item ${interactive ? 'interactive' : ''} ${compact ? 'compact' : ''}"
        role=${interactive ? 'button' : nothing}
        tabindex=${interactive ? '0' : nothing}
        title=${stat.label ? `${stat.label}: ${stat.value}${stat.unit ?? ''}` : stat.entityId}
        @pointerdown=${(ev: PointerEvent) => {
          if (!interactive) return;
          ev.stopPropagation();
          this._gestureController.handlePointerDown(ev, key, stat.actionConfig, onAction);
        }}
        @pointermove=${(ev: PointerEvent) => {
          if (!interactive) return;
          ev.stopPropagation();
          this._gestureController.handlePointerMove(ev, key);
        }}
        @pointerup=${(ev: PointerEvent) => {
          if (!interactive) return;
          ev.stopPropagation();
          this._gestureController.handlePointerUp(ev, key, stat.actionConfig, onAction);
        }}
        @pointercancel=${(ev: PointerEvent) => {
          if (!interactive) return;
          ev.stopPropagation();
          this._gestureController.handlePointerCancel(key);
        }}
        @click=${(ev: Event) => {
          if (interactive) {
            ev.stopPropagation();
          }
        }}
        @contextmenu=${(ev: Event) => {
          if (!interactive) return;
          ev.stopPropagation();
          this._gestureController.handleContextMenu(ev, key, stat.actionConfig);
        }}
        @keydown=${(ev: KeyboardEvent) => {
          if (!interactive || (ev.key !== 'Enter' && ev.key !== ' ')) return;
          ev.preventDefault();
          ev.stopPropagation();
          onAction('tap');
        }}
      >
        ${stat.icon
          ? html`<ha-icon class="stat-icon" .icon=${stat.icon}></ha-icon>`
          : nothing}
        ${stat.label && !compact
          ? html`<span class="stat-label">${stat.label}</span>`
          : nothing}
        <span class="stat-value">
          ${stat.value}${stat.unit ? html`<span class="stat-unit">${stat.unit}</span>` : nothing}
        </span>
      </div>
    `;
  }

  private _renderForecastSection(
    data: ResolvedWeatherData,
    orientation: Orientation
  ): TemplateResult | typeof nothing {
    if (!this._config.show_forecast) {
      return nothing;
    }

    if (!data.hasWeatherEntity) {
      return html`
        <div class="forecast-empty">${this._t('card.sensor_only_no_forecast')}</div>
      `;
    }

    if (this._forecastLoading && this._forecast.length === 0) {
      return html`<div class="forecast-empty">${this._t('card.forecast_loading')}</div>`;
    }

    if (this._forecastError && this._forecast.length === 0) {
      return html`<div class="forecast-empty">${this._t('card.forecast_error')}</div>`;
    }

    if (this._forecast.length === 0) {
      return nothing;
    }

    const forecastType = this._config.forecast_type ?? 'daily';
    const visibleCount = computeAdaptiveForecastCount(
      this._containerWidth,
      this._containerHeight,
      orientation,
      this._config.forecast_items
    );
    const items = this._forecast.slice(0, visibleCount);

    return html`
      <div class="forecast-list ${orientation}">
        ${items.map((item) => {
          const cond = item.condition?.trim().toLowerCase();
          const iconCond: IconCondition = isValidWeatherCondition(cond) ? cond : 'unknown';
          const itemIsNight =
            item.is_daytime === false || iconCond === 'clear-night';
          const label = formatForecastLabel(item, forecastType, this._lang);
          const high =
            typeof item.temperature === 'number' && Number.isFinite(item.temperature)
              ? `${Math.round(item.temperature)}°`
              : '—';
          const low =
            typeof item.templow === 'number' && Number.isFinite(item.templow)
              ? `${Math.round(item.templow)}°`
              : undefined;
          const precipProb =
            forecastType === 'hourly' &&
            low === undefined &&
            typeof item.precipitation_probability === 'number' &&
            item.precipitation_probability > 0
              ? `${Math.round(item.precipitation_probability)}%`
              : undefined;

          return html`
            <div class="forecast-item ${orientation}">
              <span class="forecast-label">${label}</span>
              <div class="forecast-icon-wrap">
                ${renderWeatherIcon(
                  iconCond,
                  itemIsNight,
                  'forecast-svg',
                  this._t(`conditions.${iconCond}`)
                )}
              </div>
              <div class="forecast-temps">
                <span class="forecast-high">${high}</span>
                ${low !== undefined
                  ? html`<span class="forecast-low">${low}</span>`
                  : precipProb !== undefined
                    ? html`<span class="forecast-low">${precipProb}</span>`
                    : nothing}
              </div>
            </div>
          `;
        })}
      </div>
    `;
  }

  private _renderHorizontalLayout(data: ResolvedWeatherData): TemplateResult {
    const showIcon = this._config.show_icon ?? true;
    const showTemperature = this._config.show_temperature ?? true;
    const showCondition = this._config.show_condition ?? true;
    const showName = this._config.show_name ?? true;
    const showStats = (this._config.show_stats ?? true) && data.stats.length > 0;
    const showForecast = Boolean(this._config.show_forecast);

    const isNarrow = this._containerWidth < 390;
    const isVeryCompact = this._containerWidth < 310;
    const iconCond: IconCondition = data.hasExplicitCondition
      ? data.condition
      : 'thermometer';
    const conditionText = data.unavailable
      ? this._t('card.unavailable')
      : data.hasExplicitCondition
        ? this._t(`conditions.${data.conditionLabelKey}`)
        : '';

    const tempText =
      data.temperature !== null
        ? `${data.temperature}${data.temperatureUnit}`
        : data.unavailable
          ? '—'
          : nothing;

    if (!showForecast) {
      return html`
        <div class="layout-horizontal no-forecast ${isNarrow ? 'narrow' : ''}">
          <div class="hero-row">
            ${showIcon
              ? html`
                  <div class="hero-icon-wrap ${isNarrow ? 'compact' : ''}">
                    ${renderWeatherIcon(iconCond, data.isNight, 'hero-svg', conditionText)}
                  </div>
                `
              : nothing}
            <div class="hero-primary">
              ${showTemperature && tempText !== nothing
                ? html`<div class="temperature ${isNarrow ? 'compact' : ''}">${tempText}</div>`
                : nothing}
              ${(showCondition && conditionText) || (showName && data.name && !isVeryCompact)
                ? html`
                    <div class="meta-line">
                      ${showCondition && conditionText
                        ? html`<span class="condition-text">${conditionText}</span>`
                        : nothing}
                      ${showName && data.name && !isNarrow
                        ? html`<span class="location-text">${data.name}</span>`
                        : nothing}
                    </div>
                  `
                : nothing}
            </div>
          </div>
          ${showStats
            ? html`
                <div class="stats-row ${isNarrow ? 'compact' : ''}">
                  ${data.stats.map((stat) => this._renderStatItem(stat, isNarrow))}
                </div>
              `
            : nothing}
        </div>
      `;
    }

    // Horizontal with forecast (4x2+ visual units)
    return html`
      <div class="layout-horizontal with-forecast ${this._containerWidth < 430 ? 'stacked' : ''}">
        <div class="current-pane">
          <div class="hero-row">
            ${showIcon
              ? html`
                  <div class="hero-icon-wrap">
                    ${renderWeatherIcon(iconCond, data.isNight, 'hero-svg', conditionText)}
                  </div>
                `
              : nothing}
            <div class="hero-primary">
              ${showTemperature && tempText !== nothing
                ? html`<div class="temperature">${tempText}</div>`
                : nothing}
              ${showCondition && conditionText
                ? html`<div class="condition-text">${conditionText}</div>`
                : nothing}
              ${showName && data.name
                ? html`<div class="location-text">${data.name}</div>`
                : nothing}
            </div>
          </div>
          ${showStats
            ? html`
                <div class="stats-row compact">
                  ${data.stats.map((stat) => this._renderStatItem(stat, true))}
                </div>
              `
            : nothing}
        </div>
        <div class="section-divider ${this._containerWidth < 430 ? 'horizontal' : 'vertical'}"></div>
        <div class="forecast-pane">${this._renderForecastSection(data, 'horizontal')}</div>
      </div>
    `;
  }

  private _renderVerticalLayout(data: ResolvedWeatherData): TemplateResult {
    const showIcon = this._config.show_icon ?? true;
    const showTemperature = this._config.show_temperature ?? true;
    const showCondition = this._config.show_condition ?? true;
    const showName = this._config.show_name ?? true;
    const showStats = (this._config.show_stats ?? true) && data.stats.length > 0;
    const showForecast = Boolean(this._config.show_forecast);

    const isCompactHeight = this._containerHeight < 185;
    const isNarrowWidth = this._containerWidth < 195;
    const iconCond: IconCondition = data.hasExplicitCondition
      ? data.condition
      : 'thermometer';
    const conditionText = data.unavailable
      ? this._t('card.unavailable')
      : data.hasExplicitCondition
        ? this._t(`conditions.${data.conditionLabelKey}`)
        : '';

    const tempText =
      data.temperature !== null
        ? `${data.temperature}${data.temperatureUnit}`
        : data.unavailable
          ? '—'
          : nothing;

    if (showForecast) {
      return html`
        <div class="layout-vertical with-forecast">
          <div class="vertical-summary">
            <div class="vertical-summary-top">
              ${showIcon
                ? html`
                    <div class="hero-icon-wrap medium">
                      ${renderWeatherIcon(iconCond, data.isNight, 'hero-svg', conditionText)}
                    </div>
                  `
                : nothing}
              <div class="vertical-summary-info">
                ${showTemperature && tempText !== nothing
                  ? html`<div class="temperature medium">${tempText}</div>`
                  : nothing}
                ${showCondition && conditionText
                  ? html`<div class="condition-text">${conditionText}</div>`
                  : nothing}
                ${showName && data.name
                  ? html`<div class="location-text">${data.name}</div>`
                  : nothing}
              </div>
            </div>
            ${showStats
              ? html`
                  <div class="stats-row compact centered">
                    ${data.stats.map((stat) => this._renderStatItem(stat, true))}
                  </div>
                `
              : nothing}
          </div>
          <div class="section-divider horizontal"></div>
          <div class="forecast-pane vertical">
            ${this._renderForecastSection(data, 'vertical')}
          </div>
        </div>
      `;
    }

    // Vertical without forecast (1x2 = 3x2 or 1x4 = 3x4)
    return html`
      <div
        class="layout-vertical no-forecast ${isCompactHeight ? 'compact-height' : 'tall'} ${isNarrowWidth ? 'narrow-width' : ''}"
      >
        <div class="vertical-hero">
          ${showIcon
            ? html`
                <div class="hero-icon-wrap ${isCompactHeight ? 'compact' : 'large'}">
                  ${renderWeatherIcon(iconCond, data.isNight, 'hero-svg', conditionText)}
                </div>
              `
            : nothing}
          ${showTemperature && tempText !== nothing
            ? html`<div class="temperature ${isCompactHeight ? 'compact' : 'large'}">${tempText}</div>`
            : nothing}
          ${showCondition && conditionText
            ? html`<div class="condition-text centered-wrap">${conditionText}</div>`
            : nothing}
          ${showName && data.name && !isCompactHeight
            ? html`<div class="location-text centered-wrap">${data.name}</div>`
            : nothing}
        </div>
        ${showStats
          ? html`
              ${!isCompactHeight ? html`<div class="section-divider horizontal"></div>` : nothing}
              <div class="stats-vertical ${isCompactHeight ? 'inline-wrap' : 'stacked'}">
                ${data.stats.map((stat) =>
                  this._renderStatItem(stat, isCompactHeight || isNarrowWidth)
                )}
              </div>
            `
          : nothing}
      </div>
    `;
  }

  protected render(): TemplateResult {
    const orientation: Orientation = this._config.orientation ?? 'horizontal';
    const data = resolveWeatherData(this.hass, this._config);
    const themeStyle = buildThemeInlineStyle(
      data.condition,
      data.isNight,
      this._config.background_mode
    );
    const cardActionConfig = resolveCardActionConfig(this._config);
    const cardInteractive = hasAnyAction(cardActionConfig);

    return html`
      <ha-card
        class="spwc-card ${this._config.background_mode ?? 'dynamic'} ${cardInteractive ? 'interactive' : ''}"
        style=${themeStyle}
        role=${cardInteractive ? 'button' : nothing}
        tabindex=${cardInteractive ? '0' : nothing}
        @pointerdown=${this._onCardPointerDown}
        @pointermove=${this._onCardPointerMove}
        @pointerup=${this._onCardPointerUp}
        @pointercancel=${this._onCardPointerCancel}
        @contextmenu=${this._onCardContextMenu}
        @keydown=${this._onCardKeyDown}
      >
        ${!data.hasSource
          ? html`<div class="empty-state">${this._t('card.no_source')}</div>`
          : orientation === 'vertical'
            ? this._renderVerticalLayout(data)
            : this._renderHorizontalLayout(data)}
      </ha-card>
    `;
  }

  public static styles = css`
    :host {
      display: block;
      height: 100%;
      box-sizing: border-box;
    }

    .spwc-card {
      height: 100%;
      width: 100%;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 10px 14px;
      border-radius: var(--ha-card-border-radius, 18px);
      background: var(--spwc-bg);
      color: var(--spwc-text);
      border: var(--spwc-border);
      box-shadow: var(--spwc-shadow);
      overflow: hidden;
      transition: background 0.35s ease, color 0.25s ease, border-color 0.25s ease;
      font-family: var(--ha-card-font-family, inherit);
      user-select: none;
      -webkit-tap-highlight-color: transparent;
    }

    .spwc-card.transparent {
      --ha-card-background: transparent;
      --ha-card-box-shadow: none;
      --ha-card-border-width: 0px;
      background: transparent;
      border: none;
      box-shadow: none;
    }

    .spwc-card.interactive {
      cursor: pointer;
    }

    .empty-state {
      text-align: center;
      font-size: 0.85rem;
      color: var(--spwc-muted);
      padding: 8px;
    }

    /* Typography & Hero elements */
    .hero-row {
      display: flex;
      align-items: center;
      gap: 10px;
      min-width: 0;
    }

    .hero-icon-wrap {
      width: 44px;
      height: 44px;
      flex: 0 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .hero-icon-wrap.compact {
      width: 34px;
      height: 34px;
    }

    .hero-icon-wrap.medium {
      width: 44px;
      height: 44px;
    }

    .hero-icon-wrap.large {
      width: 56px;
      height: 56px;
    }

    .hero-svg,
    .forecast-svg {
      width: 100%;
      height: 100%;
      display: block;
    }

    .hero-primary {
      display: flex;
      flex-direction: column;
      min-width: 0;
      gap: 1px;
    }

    .temperature {
      font-size: 1.65rem;
      font-weight: 600;
      line-height: 1.05;
      letter-spacing: -0.02em;
      font-variant-numeric: tabular-nums;
      white-space: nowrap;
      flex-shrink: 0;
    }

    .temperature.compact {
      font-size: 1.32rem;
    }

    .temperature.medium {
      font-size: 1.75rem;
    }

    .temperature.large {
      font-size: 2rem;
    }

    .meta-line {
      display: flex;
      align-items: baseline;
      gap: 6px;
      min-width: 0;
      flex-wrap: wrap;
    }

    .condition-text {
      font-size: 0.82rem;
      font-weight: 500;
      color: var(--spwc-text);
      opacity: 0.9;
      line-height: 1.2;
      overflow-wrap: anywhere;
    }

    .location-text {
      font-size: 0.74rem;
      color: var(--spwc-muted);
      line-height: 1.2;
      overflow-wrap: anywhere;
    }

    .centered-wrap {
      text-align: center;
      white-space: normal;
      max-width: 100%;
    }

    /* Stats */
    .stats-row {
      display: flex;
      align-items: center;
      gap: 6px;
      flex-wrap: wrap;
      min-width: 0;
    }

    .stats-row.centered {
      justify-content: center;
    }

    .stats-row.compact {
      gap: 4px;
    }

    .stat-item {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 4px 8px;
      border-radius: 999px;
      background: var(--spwc-chip-bg);
      border: 1px solid var(--spwc-chip-border);
      font-size: 0.76rem;
      line-height: 1.1;
      font-variant-numeric: tabular-nums;
      white-space: nowrap;
      flex-shrink: 0;
      transition: transform 0.15s ease, opacity 0.15s ease;
    }

    .stat-item.compact {
      padding: 3px 6px;
      font-size: 0.72rem;
      gap: 3px;
    }

    .stat-item.interactive {
      cursor: pointer;
    }

    .stat-item.interactive:hover {
      opacity: 0.88;
    }

    .stat-icon {
      --mdc-icon-size: 14px;
      color: var(--spwc-accent);
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .stat-item.compact .stat-icon {
      --mdc-icon-size: 13px;
    }

    .stat-label {
      color: var(--spwc-muted);
      font-weight: 500;
    }

    .stat-value {
      font-weight: 600;
      color: var(--spwc-text);
    }

    .stat-unit {
      font-weight: 500;
      font-size: 0.9em;
      opacity: 0.85;
      margin-left: 1px;
    }

    /* Horizontal layouts */
    .layout-horizontal.no-forecast {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      width: 100%;
      min-width: 0;
    }

    .layout-horizontal.no-forecast.narrow {
      gap: 6px;
    }

    .layout-horizontal.no-forecast.narrow .hero-row {
      gap: 7px;
    }

    .layout-horizontal.no-forecast.narrow .stats-row {
      justify-content: flex-end;
      flex-wrap: nowrap;
      overflow: hidden;
    }

    .layout-horizontal.with-forecast {
      display: flex;
      align-items: stretch;
      justify-content: space-between;
      gap: 12px;
      height: 100%;
      width: 100%;
      min-width: 0;
    }

    .layout-horizontal.with-forecast.stacked {
      flex-direction: column;
      gap: 8px;
    }

    .current-pane {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 8px;
      min-width: 0;
      flex: 0 1 auto;
    }

    .section-divider.vertical {
      width: 1px;
      align-self: stretch;
      background: var(--spwc-divider);
      flex: 0 0 1px;
    }

    .section-divider.horizontal {
      height: 1px;
      width: 100%;
      background: var(--spwc-divider);
      flex: 0 0 1px;
    }

    .forecast-pane {
      flex: 1 1 0;
      min-width: 0;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }

    .forecast-pane.vertical {
      width: 100%;
      align-items: stretch;
      justify-content: center;
    }

    .forecast-empty {
      font-size: 0.78rem;
      color: var(--spwc-muted);
      text-align: center;
      width: 100%;
      padding: 4px 6px;
    }

    .forecast-list.horizontal {
      display: flex;
      align-items: stretch;
      justify-content: space-evenly;
      gap: 6px;
      width: 100%;
    }

    .forecast-item.horizontal {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 4px;
      flex: 1 1 0;
      min-width: 46px;
      padding: 6px 4px;
      border-radius: 12px;
      background: var(--spwc-forecast-bg);
    }

    .forecast-icon-wrap {
      width: 26px;
      height: 26px;
      flex: 0 0 auto;
    }

    .forecast-label {
      font-size: 0.72rem;
      font-weight: 600;
      color: var(--spwc-muted);
      text-transform: capitalize;
      white-space: nowrap;
    }

    .forecast-temps {
      display: flex;
      flex-direction: column;
      align-items: center;
      line-height: 1.15;
      font-variant-numeric: tabular-nums;
    }

    .forecast-high {
      font-size: 0.8rem;
      font-weight: 600;
      color: var(--spwc-text);
    }

    .forecast-low {
      font-size: 0.71rem;
      color: var(--spwc-muted);
    }

    /* Vertical layouts */
    .layout-vertical.no-forecast {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-evenly;
      height: 100%;
      width: 100%;
      gap: 8px;
      min-width: 0;
    }

    .layout-vertical.no-forecast.compact-height {
      gap: 5px;
    }

    .vertical-hero {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 4px;
      width: 100%;
      min-width: 0;
    }

    .stats-vertical.inline-wrap {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 4px;
      width: 100%;
    }

    .stats-vertical.stacked {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      gap: 6px;
      width: 100%;
    }

    .stats-vertical.stacked .stat-item {
      justify-content: space-between;
      border-radius: 12px;
      padding: 5px 10px;
    }

    .layout-vertical.with-forecast {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 8px;
      height: 100%;
      width: 100%;
      min-width: 0;
    }

    .vertical-summary {
      display: flex;
      flex-direction: column;
      gap: 6px;
      width: 100%;
    }

    .vertical-summary-top {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      min-width: 0;
    }

    .vertical-summary-info {
      display: flex;
      flex-direction: column;
      min-width: 0;
      gap: 1px;
    }

    .forecast-list.vertical {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      gap: 4px;
      width: 100%;
    }

    .forecast-item.vertical {
      display: grid;
      grid-template-columns: minmax(42px, 1fr) 24px auto;
      align-items: center;
      gap: 8px;
      padding: 3px 8px;
      border-radius: 10px;
      background: var(--spwc-forecast-bg);
    }

    .forecast-item.vertical .forecast-icon-wrap {
      width: 22px;
      height: 22px;
    }

    .forecast-item.vertical .forecast-temps {
      flex-direction: row;
      gap: 6px;
      justify-content: flex-end;
    }
  `;
}

const win = window as unknown as {
  customCards?: Array<Record<string, unknown>>;
};
win.customCards = win.customCards || [];
if (!win.customCards.some((card) => card.type === 'simple-pastel-weather-card')) {
  win.customCards.push({
    type: 'simple-pastel-weather-card',
    name: 'Simple Pastel Weather Card',
    preview: true,
    description:
      'Minimalist pastel weather card with custom SVG icons, custom sensors, horizontal/vertical layouts, dynamic day/night backgrounds, and transparent mode.',
  });
}

declare global {
  interface HTMLElementTagNameMap {
    'simple-pastel-weather-card': SimplePastelWeatherCard;
  }
}
