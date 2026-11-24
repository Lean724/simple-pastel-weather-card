import { STANDARD_WEATHER_CONDITIONS } from './icons/weather-icons';
import { getPastelThemeVariables, resolveIsNight } from './styles/pastel-themes';
import {
  ActionConfig,
  ActionTargetConfig,
  ActionTrigger,
  DEFAULT_CONFIG,
  HassEntity,
  HomeAssistant,
  LovelaceGridOptions,
  Orientation,
  ResolvedStatItem,
  ResolvedWeatherData,
  SimplePastelWeatherCardConfig,
  StatSlotConfig,
  WeatherCondition,
} from './types';

const HOLD_THRESHOLD_MS = 500;
const DOUBLE_TAP_WINDOW_MS = 250;
const MOVE_THRESHOLD_PX = 10;

interface GestureState {
  pointerId?: number;
  startX: number;
  startY: number;
  held: boolean;
  moved: boolean;
  active: boolean;
  holdTimer?: number;
  tapTimer?: number;
  lastPointerType?: string;
}

export function isValidWeatherCondition(value: unknown): value is WeatherCondition {
  return (
    typeof value === 'string' &&
    (STANDARD_WEATHER_CONDITIONS as readonly string[]).includes(value)
  );
}

/**
 * Computes Home Assistant Sections grid options for horizontal and vertical modes.
 * Visual blocks map to 3 grid columns horizontally (4 blocks = 12 columns).
 */
export function computeGridOptions(
  config: SimplePastelWeatherCardConfig
): LovelaceGridOptions {
  const orientation: Orientation = config.orientation ?? DEFAULT_CONFIG.orientation ?? 'horizontal';
  const showForecast = Boolean(config.show_forecast);

  if (orientation === 'vertical') {
    if (showForecast) {
      return {
        columns: 6,
        min_columns: 6,
        max_columns: 12,
        rows: 4,
        min_rows: 4,
      };
    }
    return {
      columns: 3,
      min_columns: 3,
      max_columns: 12,
      rows: 2,
      min_rows: 2,
    };
  }

  if (showForecast) {
    return {
      columns: 12,
      min_columns: 12,
      max_columns: 12,
      rows: 2,
      min_rows: 2,
    };
  }

  return {
    columns: 6,
    min_columns: 6,
    max_columns: 12,
    rows: 1,
    min_rows: 1,
  };
}

/**
 * Normalizes stat slots from `stats` array or `stat_1`/`stat_2`/`stat_3` aliases, capped at 3.
 */
export function normalizeStats(config: SimplePastelWeatherCardConfig): StatSlotConfig[] {
  const rawSlots: Array<StatSlotConfig | undefined> = Array.isArray(config.stats)
    ? config.stats
    : [config.stat_1, config.stat_2, config.stat_3];

  return rawSlots
    .filter((slot): slot is StatSlotConfig => Boolean(slot && typeof slot.entity === 'string' && slot.entity.trim() !== ''))
    .slice(0, 3);
}

function isUnavailableState(value: unknown): boolean {
  if (value === undefined || value === null) return true;
  if (typeof value === 'string') {
    const trimmed = value.trim().toLowerCase();
    return trimmed === '' || trimmed === 'unavailable' || trimmed === 'unknown';
  }
  return false;
}

function formatNumericOrText(raw: unknown): string {
  if (typeof raw === 'number') {
    if (!Number.isFinite(raw)) return '';
    return Number.isInteger(raw) ? String(raw) : raw.toFixed(1);
  }
  if (typeof raw === 'string') {
    const trimmed = raw.trim();
    const num = Number(trimmed);
    if (trimmed !== '' && Number.isFinite(num)) {
      return Number.isInteger(num) ? String(num) : num.toFixed(1);
    }
    return trimmed;
  }
  return String(raw ?? '');
}

function inferDefaultStatIcon(entityObj: HassEntity | undefined): string {
  const deviceClass = String(entityObj?.attributes?.device_class ?? '').toLowerCase();
  const unit = String(entityObj?.attributes?.unit_of_measurement ?? '').toLowerCase();

  if (deviceClass === 'humidity' || unit === '%') return 'mdi:water-percent';
  if (deviceClass === 'temperature' || unit.includes('°')) return 'mdi:thermometer';
  if (deviceClass === 'wind_speed' || unit.includes('km/h') || unit.includes('m/s') || unit.includes('mph')) {
    return 'mdi:weather-windy';
  }
  if (deviceClass === 'pressure' || unit === 'hpa' || unit === 'mbar') return 'mdi:gauge';
  if (deviceClass === 'precipitation' || deviceClass === 'precipitation_intensity' || unit === 'mm') {
    return 'mdi:weather-rainy';
  }
  if (deviceClass === 'irradiance' || entityObj?.entity_id.includes('uv')) return 'mdi:weather-sunny';
  if (deviceClass === 'aqi' || deviceClass === 'pm25' || deviceClass === 'pm10') return 'mdi:air-filter';
  return 'mdi:chart-box-outline';
}

export function resolveStatActionConfig(slot: StatSlotConfig, entityId: string): ActionTargetConfig {
  return {
    entity: entityId,
    tap_action: slot.tap_action ?? { action: 'more-info' },
    double_tap_action: slot.double_tap_action ?? { action: 'none' },
    hold_action: slot.hold_action ?? { action: 'none' },
  };
}

export function resolveCardActionConfig(config: SimplePastelWeatherCardConfig): ActionTargetConfig {
  const defaultEntity = config.entity || config.temperature_entity || normalizeStats(config)[0]?.entity;
  return {
    entity: defaultEntity,
    tap_action: config.tap_action ?? (defaultEntity ? { action: 'more-info' } : { action: 'none' }),
    double_tap_action: config.double_tap_action ?? { action: 'none' },
    hold_action: config.hold_action ?? { action: 'none' },
  };
}

/**
 * Resolves current weather display values from a weather entity, overrides, or sensor-only config.
 */
export function resolveWeatherData(
  hass: HomeAssistant | undefined,
  config: SimplePastelWeatherCardConfig,
  now: Date = new Date()
): ResolvedWeatherData {
  const statSlots = normalizeStats(config);
  const weatherEntityId = config.entity?.trim() || undefined;
  const tempEntityId = config.temperature_entity?.trim() || undefined;
  const condEntityId = config.condition_entity?.trim() || undefined;

  const hasSource = Boolean(weatherEntityId || tempEntityId || condEntityId || statSlots.length > 0);
  const weatherEntity = weatherEntityId ? hass?.states?.[weatherEntityId] : undefined;
  const tempEntity = tempEntityId ? hass?.states?.[tempEntityId] : undefined;
  const condEntity = condEntityId ? hass?.states?.[condEntityId] : undefined;

  // Condition resolution
  let rawCondition: string | undefined;
  if (condEntity && !isUnavailableState(condEntity.state)) {
    rawCondition = condEntity.state;
  } else if (weatherEntity && !isUnavailableState(weatherEntity.state)) {
    rawCondition = weatherEntity.state;
  }

  const normalizedCond = rawCondition?.trim().toLowerCase();
  const hasExplicitCondition = Boolean(rawCondition);
  const condition: WeatherCondition | 'unknown' = isValidWeatherCondition(normalizedCond)
    ? normalizedCond
    : 'unknown';

  // Temperature resolution
  let temperature: string | null = null;
  let temperatureUnit = hass?.config?.unit_system?.temperature ?? '°C';

  if (tempEntityId) {
    if (tempEntity) {
      const attrName = config.temperature_attribute?.trim();
      const rawVal = attrName ? tempEntity.attributes?.[attrName] : tempEntity.state;
      if (!isUnavailableState(rawVal)) {
        temperature = formatNumericOrText(rawVal);
      }
      if (typeof tempEntity.attributes?.unit_of_measurement === 'string' && !attrName) {
        temperatureUnit = tempEntity.attributes.unit_of_measurement;
      }
    }
  } else if (weatherEntity) {
    const weatherTemp = weatherEntity.attributes?.temperature;
    if (!isUnavailableState(weatherTemp)) {
      temperature = formatNumericOrText(weatherTemp);
    }
    if (typeof weatherEntity.attributes?.temperature_unit === 'string') {
      temperatureUnit = weatherEntity.attributes.temperature_unit;
    }
  }

  // Name resolution
  const resolvedName =
    config.name?.trim() ||
    (typeof weatherEntity?.attributes?.friendly_name === 'string'
      ? weatherEntity.attributes.friendly_name
      : '') ||
    (typeof tempEntity?.attributes?.friendly_name === 'string'
      ? tempEntity.attributes.friendly_name
      : '') ||
    '';

  const isNight = resolveIsNight(hass, condition, now);

  // Stats resolution (up to 3)
  const resolvedStats: ResolvedStatItem[] = statSlots.map((slot, index) => {
    const entityId = slot.entity!.trim();
    const stateObj = hass?.states?.[entityId];
    const attrName = slot.attribute?.trim();

    if (!stateObj) {
      return {
        index,
        entityId,
        value: '—',
        label: slot.label?.trim() || undefined,
        icon: slot.icon?.trim() || 'mdi:chart-box-outline',
        unavailable: true,
        actionConfig: resolveStatActionConfig(slot, entityId),
      };
    }

    const rawValue = attrName ? stateObj.attributes?.[attrName] : stateObj.state;
    const unavailable = isUnavailableState(rawValue);
    const formattedValue = unavailable ? '—' : formatNumericOrText(rawValue);

    const customUnit = slot.unit?.trim();
    const entityUnit =
      !attrName && typeof stateObj.attributes?.unit_of_measurement === 'string'
        ? stateObj.attributes.unit_of_measurement
        : undefined;
    const unit = unavailable ? undefined : (customUnit ?? entityUnit);

    return {
      index,
      entityId,
      value: formattedValue,
      unit,
      label: slot.label?.trim() || undefined,
      icon: slot.icon?.trim() || inferDefaultStatIcon(stateObj),
      unavailable,
      actionConfig: resolveStatActionConfig(slot, entityId),
    };
  });

  const mainUnavailable =
    Boolean(weatherEntityId && !weatherEntity) ||
    Boolean(tempEntityId && !tempEntity) ||
    (Boolean(weatherEntity) &&
      isUnavailableState(weatherEntity?.state) &&
      temperature === null &&
      !condEntity);

  return {
    hasSource,
    hasWeatherEntity: Boolean(weatherEntityId),
    condition,
    rawCondition,
    hasExplicitCondition,
    conditionLabelKey: condition,
    temperature,
    temperatureUnit,
    name: resolvedName,
    isNight,
    stats: resolvedStats,
    unavailable: mainUnavailable,
  };
}

export function buildThemeInlineStyle(
  condition: WeatherCondition | 'unknown',
  isNight: boolean,
  backgroundMode: SimplePastelWeatherCardConfig['background_mode']
): string {
  const tokens = getPastelThemeVariables(
    condition,
    isNight,
    backgroundMode ?? DEFAULT_CONFIG.background_mode ?? 'dynamic'
  );
  return [
    `--spwc-bg: ${tokens.bg}`,
    `--spwc-text: ${tokens.text}`,
    `--spwc-muted: ${tokens.muted}`,
    `--spwc-chip-bg: ${tokens.chipBg}`,
    `--spwc-chip-border: ${tokens.chipBorder}`,
    `--spwc-forecast-bg: ${tokens.forecastBg}`,
    `--spwc-border: ${tokens.border}`,
    `--spwc-shadow: ${tokens.shadow}`,
    `--spwc-accent: ${tokens.accent}`,
    `--spwc-divider: ${tokens.divider}`,
  ].join('; ');
}

export function hasAction(action?: ActionConfig): boolean {
  return Boolean(action && action.action && action.action !== 'none');
}

export function hasAnyAction(config: ActionTargetConfig): boolean {
  return (
    hasAction(config.tap_action) ||
    hasAction(config.double_tap_action) ||
    hasAction(config.hold_action)
  );
}

export function fireHassAction(
  node: HTMLElement,
  actionConfig: ActionTargetConfig,
  action: ActionTrigger
): void {
  const triggerConfig =
    action === 'tap'
      ? actionConfig.tap_action
      : action === 'double_tap'
        ? actionConfig.double_tap_action
        : actionConfig.hold_action;
  if (!hasAction(triggerConfig)) return;

  node.dispatchEvent(
    new CustomEvent('hass-action', {
      detail: { config: actionConfig, action },
      bubbles: true,
      composed: true,
    })
  );
}

/**
 * Coordinates tap, double_tap, and hold pointer gestures for card and stat slot targets.
 */
export class ActionGestureController {
  private _states = new Map<string, GestureState>();

  private _getOrCreateState(key: string): GestureState {
    let state = this._states.get(key);
    if (!state) {
      state = {
        startX: 0,
        startY: 0,
        held: false,
        moved: false,
        active: false,
      };
      this._states.set(key, state);
    }
    return state;
  }

  private _clearHoldTimer(state: GestureState): void {
    if (state.holdTimer !== undefined) {
      window.clearTimeout(state.holdTimer);
      state.holdTimer = undefined;
    }
  }

  private _clearTapTimer(state: GestureState): void {
    if (state.tapTimer !== undefined) {
      window.clearTimeout(state.tapTimer);
      state.tapTimer = undefined;
    }
  }

  public handlePointerDown(
    ev: PointerEvent,
    key: string,
    config: ActionTargetConfig,
    onAction: (action: ActionTrigger) => void
  ): void {
    if (ev.pointerType === 'mouse' && ev.button !== 0) {
      return;
    }

    const state = this._getOrCreateState(key);
    this._clearHoldTimer(state);

    state.pointerId = ev.pointerId;
    state.startX = ev.clientX;
    state.startY = ev.clientY;
    state.held = false;
    state.moved = false;
    state.active = true;
    state.lastPointerType = ev.pointerType;

    if (hasAction(config.hold_action)) {
      state.holdTimer = window.setTimeout(() => {
        state.holdTimer = undefined;
        if (!state.active || state.moved) return;
        state.held = true;
        onAction('hold');
      }, HOLD_THRESHOLD_MS);
    }
  }

  public handlePointerMove(ev: PointerEvent, key: string): void {
    const state = this._states.get(key);
    if (!state || !state.active || state.moved) return;
    if (state.pointerId !== undefined && ev.pointerId !== state.pointerId) return;

    const distance = Math.hypot(ev.clientX - state.startX, ev.clientY - state.startY);
    if (distance > MOVE_THRESHOLD_PX) {
      state.moved = true;
      this._clearHoldTimer(state);
    }
  }

  public handlePointerUp(
    ev: PointerEvent,
    key: string,
    config: ActionTargetConfig,
    onAction: (action: ActionTrigger) => void
  ): void {
    const state = this._states.get(key);
    if (!state || !state.active) return;
    if (state.pointerId !== undefined && ev.pointerId !== state.pointerId) return;

    this._clearHoldTimer(state);
    state.active = false;

    if (state.held || state.moved) {
      this._clearTapTimer(state);
      state.moved = false;
      return;
    }

    if (hasAction(config.double_tap_action)) {
      if (state.tapTimer !== undefined) {
        this._clearTapTimer(state);
        onAction('double_tap');
      } else {
        state.tapTimer = window.setTimeout(() => {
          state.tapTimer = undefined;
          if (hasAction(config.tap_action)) {
            onAction('tap');
          }
        }, DOUBLE_TAP_WINDOW_MS);
      }
      return;
    }

    this._clearTapTimer(state);
    if (hasAction(config.tap_action)) {
      onAction('tap');
    }
  }

  public handlePointerCancel(key: string): void {
    const state = this._states.get(key);
    if (!state) return;

    this._clearHoldTimer(state);
    this._clearTapTimer(state);
    state.active = false;
    state.held = false;
    state.moved = false;
  }

  public handleContextMenu(ev: Event, key: string, config: ActionTargetConfig): void {
    if (!hasAction(config.hold_action)) return;
    const state = this._states.get(key);
    if (
      state?.held ||
      state?.lastPointerType === 'touch' ||
      state?.lastPointerType === 'pen'
    ) {
      ev.preventDefault();
    }
  }

  public destroy(): void {
    for (const state of this._states.values()) {
      this._clearHoldTimer(state);
      this._clearTapTimer(state);
    }
    this._states.clear();
  }
}
