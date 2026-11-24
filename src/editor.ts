import { LitElement, TemplateResult, css, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { normalizeStats } from './helpers';
import { localize, resolveLanguage } from './localize/localize';
import {
  DEFAULT_CONFIG,
  HomeAssistant,
  LovelaceCardEditor,
  SimplePastelWeatherCardConfig,
  StatSlotConfig,
  SupportedLanguage,
} from './types';

type HaFormSchema = Record<string, unknown>;

@customElement('simple-pastel-weather-card-editor')
export class SimplePastelWeatherCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config: SimplePastelWeatherCardConfig = {
    type: 'custom:simple-pastel-weather-card',
    ...DEFAULT_CONFIG,
  };
  @state() private _helpersLoaded = false;

  public setConfig(config: SimplePastelWeatherCardConfig): void {
    this._config = {
      ...DEFAULT_CONFIG,
      ...config,
    };
  }

  public connectedCallback(): void {
    super.connectedCallback();
    void this._ensureHaComponents();
  }

  private async _ensureHaComponents(): Promise<void> {
    if (customElements.get('ha-form')) {
      this._helpersLoaded = true;
      return;
    }

    try {
      const win = window as unknown as {
        loadCardHelpers?: () => Promise<{
          createCardElement: (cfg: Record<string, unknown>) => Promise<{
            constructor?: { getConfigElement?: () => Promise<unknown> };
          }>;
        }>;
      };
      const helpers = await win.loadCardHelpers?.();
      if (helpers) {
        const entitiesCard = await helpers.createCardElement({
          type: 'entities',
          entities: [],
        });
        await entitiesCard?.constructor?.getConfigElement?.();
      }
    } catch {
      // Ignore outside Home Assistant frontend
    } finally {
      this._helpersLoaded = true;
      this.requestUpdate();
    }
  }

  private get _lang(): SupportedLanguage {
    const hassLang = this.hass?.locale?.language || this.hass?.language;
    return resolveLanguage(hassLang);
  }

  private _t(key: string): string {
    return localize(key, this._lang);
  }

  private _buildFormData(): Record<string, unknown> {
    const stats = normalizeStats(this._config);
    return {
      ...DEFAULT_CONFIG,
      ...this._config,
      stat_1: stats[0] ? { ...stats[0] } : {},
      stat_2: stats[1] ? { ...stats[1] } : {},
      stat_3: stats[2] ? { ...stats[2] } : {},
    };
  }

  private _cleanStatSlot(
    rawSlot: unknown,
    previousSlot: StatSlotConfig | undefined
  ): StatSlotConfig | undefined {
    if (!rawSlot || typeof rawSlot !== 'object') return undefined;
    const raw = rawSlot as Record<string, unknown>;
    const entity = typeof raw.entity === 'string' ? raw.entity.trim() : '';
    if (!entity) {
      return undefined;
    }

    const slot: StatSlotConfig = { entity };
    const prevEntity = previousSlot?.entity?.trim();

    if (typeof raw.attribute === 'string' && raw.attribute.trim() !== '' && prevEntity === entity) {
      slot.attribute = raw.attribute.trim();
    } else if (
      typeof raw.attribute === 'string' &&
      raw.attribute.trim() !== '' &&
      prevEntity === undefined
    ) {
      slot.attribute = raw.attribute.trim();
    }

    if (typeof raw.label === 'string' && raw.label.trim() !== '') {
      slot.label = raw.label.trim();
    }
    if (typeof raw.icon === 'string' && raw.icon.trim() !== '') {
      slot.icon = raw.icon.trim();
    }
    if (typeof raw.unit === 'string' && raw.unit.trim() !== '') {
      slot.unit = raw.unit.trim();
    }
    if (raw.tap_action && typeof raw.tap_action === 'object') {
      slot.tap_action = raw.tap_action as StatSlotConfig['tap_action'];
    }
    if (raw.double_tap_action && typeof raw.double_tap_action === 'object') {
      slot.double_tap_action = raw.double_tap_action as StatSlotConfig['double_tap_action'];
    }
    if (raw.hold_action && typeof raw.hold_action === 'object') {
      slot.hold_action = raw.hold_action as StatSlotConfig['hold_action'];
    }

    return slot;
  }

  private _buildStatSlotSchema(
    slotKey: 'stat_1' | 'stat_2' | 'stat_3',
    titleKey: string,
    slotData: StatSlotConfig | undefined
  ): HaFormSchema {
    const hasEntity = Boolean(slotData?.entity && slotData.entity.trim() !== '');
    const innerSchema: HaFormSchema[] = [
      {
        name: 'entity',
        selector: { entity: {} },
      },
    ];

    if (hasEntity && slotData?.entity) {
      innerSchema.push({
        name: 'attribute',
        selector: { attribute: { entity_id: slotData.entity } },
      });
    }

    innerSchema.push(
      {
        type: 'grid',
        schema: [
          { name: 'label', selector: { text: {} } },
          { name: 'unit', selector: { text: {} } },
        ],
      },
      {
        name: 'icon',
        selector: { icon: {} },
      },
      {
        name: 'tap_action',
        selector: { ui_action: {} },
      },
      {
        name: 'double_tap_action',
        selector: { ui_action: {} },
      },
      {
        name: 'hold_action',
        selector: { ui_action: {} },
      }
    );

    return {
      type: 'expandable',
      name: slotKey,
      title: this._t(titleKey),
      schema: innerSchema,
    };
  }

  private _buildSchema(formData: Record<string, unknown>): HaFormSchema[] {
    const tempEntity =
      typeof formData.temperature_entity === 'string'
        ? formData.temperature_entity.trim()
        : '';

    const sourcesSchema: HaFormSchema[] = [
      {
        name: 'entity',
        selector: { entity: { domain: 'weather' } },
      },
      {
        name: 'temperature_entity',
        selector: { entity: { domain: ['sensor', 'input_number', 'number'] } },
      },
    ];

    if (tempEntity) {
      sourcesSchema.push({
        name: 'temperature_attribute',
        selector: { attribute: { entity_id: tempEntity } },
      });
    }

    sourcesSchema.push(
      {
        name: 'condition_entity',
        selector: { entity: { domain: ['sensor', 'weather', 'input_text'] } },
      },
      {
        name: 'name',
        selector: { text: {} },
      }
    );

    const layoutSchema: HaFormSchema[] = [
      {
        name: 'orientation',
        selector: {
          select: {
            mode: 'dropdown',
            options: [
              { value: 'horizontal', label: this._t('editor.orientation_horizontal') },
              { value: 'vertical', label: this._t('editor.orientation_vertical') },
            ],
          },
        },
      },
      {
        name: 'background_mode',
        selector: {
          select: {
            mode: 'dropdown',
            options: [
              { value: 'dynamic', label: this._t('editor.background_dynamic') },
              { value: 'theme', label: this._t('editor.background_theme') },
              { value: 'transparent', label: this._t('editor.background_transparent') },
            ],
          },
        },
      },
    ];

    const visibilitySchema: HaFormSchema[] = [
      {
        type: 'grid',
        schema: [
          { name: 'show_icon', selector: { boolean: {} } },
          { name: 'show_temperature', selector: { boolean: {} } },
          { name: 'show_condition', selector: { boolean: {} } },
          { name: 'show_name', selector: { boolean: {} } },
          { name: 'show_stats', selector: { boolean: {} } },
          { name: 'show_forecast', selector: { boolean: {} } },
        ],
      },
    ];

    const forecastSchema: HaFormSchema[] = [
      {
        name: 'forecast_type',
        selector: {
          select: {
            mode: 'dropdown',
            options: [
              { value: 'daily', label: this._t('editor.forecast_daily') },
              { value: 'hourly', label: this._t('editor.forecast_hourly') },
            ],
          },
        },
      },
      {
        name: 'forecast_items',
        selector: {
          number: {
            min: 1,
            max: 14,
            mode: 'box',
          },
        },
      },
    ];

    const stat1Data = formData.stat_1 as StatSlotConfig | undefined;
    const stat2Data = formData.stat_2 as StatSlotConfig | undefined;
    const stat3Data = formData.stat_3 as StatSlotConfig | undefined;

    return [
      {
        type: 'expandable',
        flatten: true,
        expanded: true,
        title: this._t('editor.section_sources'),
        schema: sourcesSchema,
      },
      {
        type: 'expandable',
        flatten: true,
        expanded: true,
        title: this._t('editor.section_layout'),
        schema: layoutSchema,
      },
      {
        type: 'expandable',
        flatten: true,
        title: this._t('editor.section_visibility'),
        schema: visibilitySchema,
      },
      {
        type: 'expandable',
        flatten: true,
        title: this._t('editor.section_forecast'),
        schema: forecastSchema,
      },
      {
        type: 'expandable',
        flatten: true,
        title: this._t('editor.section_stats'),
        schema: [
          this._buildStatSlotSchema('stat_1', 'editor.stat_slot_1', stat1Data),
          this._buildStatSlotSchema('stat_2', 'editor.stat_slot_2', stat2Data),
          this._buildStatSlotSchema('stat_3', 'editor.stat_slot_3', stat3Data),
        ],
      },
      {
        type: 'expandable',
        flatten: true,
        title: this._t('editor.section_actions'),
        schema: [
          { name: 'tap_action', selector: { ui_action: {} } },
          { name: 'double_tap_action', selector: { ui_action: {} } },
          { name: 'hold_action', selector: { ui_action: {} } },
        ],
      },
    ];
  }

  private _computeLabel = (schema: { name?: string }): string => {
    switch (schema.name) {
      case 'entity':
        return this._t('editor.entity');
      case 'temperature_entity':
        return this._t('editor.temperature_entity');
      case 'temperature_attribute':
        return this._t('editor.temperature_attribute');
      case 'condition_entity':
        return this._t('editor.condition_entity');
      case 'name':
        return this._t('editor.name');
      case 'orientation':
        return this._t('editor.orientation');
      case 'background_mode':
        return this._t('editor.background_mode');
      case 'show_icon':
        return this._t('editor.show_icon');
      case 'show_temperature':
        return this._t('editor.show_temperature');
      case 'show_condition':
        return this._t('editor.show_condition');
      case 'show_name':
        return this._t('editor.show_name');
      case 'show_stats':
        return this._t('editor.show_stats');
      case 'show_forecast':
        return this._t('editor.show_forecast');
      case 'forecast_type':
        return this._t('editor.forecast_type');
      case 'forecast_items':
        return this._t('editor.forecast_items');
      case 'attribute':
        return this._t('editor.stat_attribute');
      case 'label':
        return this._t('editor.stat_label');
      case 'icon':
        return this._t('editor.stat_icon');
      case 'unit':
        return this._t('editor.stat_unit');
      case 'tap_action':
        return this._t('editor.tap_action');
      case 'double_tap_action':
        return this._t('editor.double_tap_action');
      case 'hold_action':
        return this._t('editor.hold_action');
      default:
        return schema.name ?? '';
    }
  };

  private _computeHelper = (schema: { name?: string }): string | undefined => {
    switch (schema.name) {
      case 'entity':
        return this._t('editor.entity_helper');
      case 'temperature_entity':
        return this._t('editor.temperature_entity_helper');
      case 'condition_entity':
        return this._t('editor.condition_entity_helper');
      case 'forecast_items':
        return this._t('editor.forecast_items_helper');
      default:
        return undefined;
    }
  };

  private _handleValueChanged(ev: CustomEvent<{ value: Record<string, unknown> }>): void {
    ev.stopPropagation();
    const rawValue = ev.detail?.value;
    if (!rawValue || typeof rawValue !== 'object') return;

    const prevStats = normalizeStats(this._config);
    const prevTempEntity = this._config.temperature_entity?.trim() || '';

    const nextConfig: SimplePastelWeatherCardConfig = {
      type: this._config.type || 'custom:simple-pastel-weather-card',
    };

    const stringKeys = [
      'entity',
      'temperature_entity',
      'temperature_attribute',
      'condition_entity',
      'name',
      'orientation',
      'background_mode',
      'forecast_type',
    ] as const;

    for (const key of stringKeys) {
      const val = rawValue[key];
      if (typeof val === 'string' && val.trim() !== '') {
        (nextConfig as unknown as Record<string, unknown>)[key] = val.trim();
      }
    }

    // Clear stale temperature attribute if temperature entity was removed or changed
    const nextTempEntity = nextConfig.temperature_entity || '';
    if (!nextTempEntity || (prevTempEntity && prevTempEntity !== nextTempEntity)) {
      delete nextConfig.temperature_attribute;
    }

    const booleanKeys = [
      'show_icon',
      'show_temperature',
      'show_condition',
      'show_name',
      'show_stats',
      'show_forecast',
    ] as const;

    for (const key of booleanKeys) {
      if (typeof rawValue[key] === 'boolean') {
        nextConfig[key] = rawValue[key];
      }
    }

    if (typeof rawValue.forecast_items === 'number' && Number.isFinite(rawValue.forecast_items) && rawValue.forecast_items > 0) {
      nextConfig.forecast_items = Math.floor(rawValue.forecast_items);
    }

    const nextStats = [
      this._cleanStatSlot(rawValue.stat_1, prevStats[0]),
      this._cleanStatSlot(rawValue.stat_2, prevStats[1]),
      this._cleanStatSlot(rawValue.stat_3, prevStats[2]),
    ].filter((slot): slot is StatSlotConfig => Boolean(slot));

    if (nextStats.length > 0) {
      nextConfig.stats = nextStats;
    }

    const actionKeys = ['tap_action', 'double_tap_action', 'hold_action'] as const;
    for (const key of actionKeys) {
      const val = rawValue[key];
      if (val && typeof val === 'object') {
        nextConfig[key] = val as SimplePastelWeatherCardConfig[typeof key];
      }
    }

    this._config = nextConfig;
    this.dispatchEvent(
      new CustomEvent('config-changed', {
        detail: { config: nextConfig },
        bubbles: true,
        composed: true,
      })
    );
  }

  protected render(): TemplateResult {
    const formData = this._buildFormData();
    const schema = this._buildSchema(formData);
    const missingWeatherForForecast =
      Boolean(this._config.show_forecast) && !this._config.entity?.trim();

    return html`
      <div class="editor-root">
        ${missingWeatherForForecast
          ? html`<div class="editor-notice">${this._t('editor.forecast_requires_weather')}</div>`
          : nothing}
        ${this._helpersLoaded
          ? html`
              <ha-form
                .hass=${this.hass}
                .data=${formData}
                .schema=${schema}
                .computeLabel=${this._computeLabel}
                .computeHelper=${this._computeHelper}
                @value-changed=${this._handleValueChanged}
              ></ha-form>
            `
          : nothing}
      </div>
    `;
  }

  public static styles = css`
    .editor-root {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .editor-notice {
      padding: 10px 12px;
      border-radius: 10px;
      background: var(--warning-color, rgba(245, 158, 11, 0.14));
      color: var(--primary-text-color);
      font-size: 0.875rem;
      line-height: 1.35;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'simple-pastel-weather-card-editor': SimplePastelWeatherCardEditor;
  }
}
