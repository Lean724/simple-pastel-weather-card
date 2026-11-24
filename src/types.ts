export type Orientation = 'horizontal' | 'vertical';
export type BackgroundMode = 'dynamic' | 'theme' | 'transparent';
export type ForecastType = 'daily' | 'hourly';
export type ActionTrigger = 'tap' | 'double_tap' | 'hold';

export type SupportedLanguage =
  | 'en'
  | 'es'
  | 'zh-Hans'
  | 'de'
  | 'it'
  | 'fr'
  | 'pt'
  | 'ru'
  | 'pl'
  | 'nl';

export type WeatherCondition =
  | 'sunny'
  | 'clear-night'
  | 'partlycloudy'
  | 'cloudy'
  | 'rainy'
  | 'pouring'
  | 'lightning'
  | 'lightning-rainy'
  | 'snowy'
  | 'snowy-rainy'
  | 'hail'
  | 'fog'
  | 'windy'
  | 'windy-variant'
  | 'exceptional';

export type ActionType =
  | 'more-info'
  | 'toggle'
  | 'navigate'
  | 'url'
  | 'perform-action'
  | 'call-service'
  | 'assist'
  | 'none';

export interface ActionConfig {
  action: ActionType;
  entity?: string;
  navigation_path?: string;
  url_path?: string;
  service?: string;
  perform_action?: string;
  service_data?: Record<string, unknown>;
  data?: Record<string, unknown>;
  target?: Record<string, unknown>;
  confirmation?: boolean | { text?: string };
}

export interface ActionTargetConfig {
  entity?: string;
  tap_action?: ActionConfig;
  double_tap_action?: ActionConfig;
  hold_action?: ActionConfig;
}

export interface StatSlotConfig {
  entity?: string;
  attribute?: string;
  label?: string;
  icon?: string;
  unit?: string;
  tap_action?: ActionConfig;
  double_tap_action?: ActionConfig;
  hold_action?: ActionConfig;
}

export interface SimplePastelWeatherCardConfig {
  type: string;
  entity?: string;
  temperature_entity?: string;
  temperature_attribute?: string;
  condition_entity?: string;
  name?: string;
  orientation?: Orientation;
  background_mode?: BackgroundMode;
  show_icon?: boolean;
  show_temperature?: boolean;
  show_condition?: boolean;
  show_name?: boolean;
  show_stats?: boolean;
  show_forecast?: boolean;
  forecast_type?: ForecastType;
  forecast_items?: number;
  stats?: StatSlotConfig[];
  stat_1?: StatSlotConfig;
  stat_2?: StatSlotConfig;
  stat_3?: StatSlotConfig;
  tap_action?: ActionConfig;
  double_tap_action?: ActionConfig;
  hold_action?: ActionConfig;
}

export const DEFAULT_CONFIG: Omit<SimplePastelWeatherCardConfig, 'type'> = {
  orientation: 'horizontal',
  background_mode: 'dynamic',
  show_icon: true,
  show_temperature: true,
  show_condition: true,
  show_name: true,
  show_stats: true,
  show_forecast: false,
  forecast_type: 'daily',
};

export interface ForecastEntry {
  datetime: string;
  condition?: string;
  temperature?: number;
  templow?: number;
  precipitation?: number;
  precipitation_probability?: number;
  wind_speed?: number;
  wind_bearing?: number | string;
  humidity?: number;
  is_daytime?: boolean;
}

export interface ForecastEvent {
  type: ForecastType;
  forecast: ForecastEntry[] | null;
}

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown>;
  last_changed?: string;
  last_updated?: string;
}

export interface HassConnection {
  subscribeMessage<T = unknown>(
    callback: (msg: T) => void,
    subscribeMessage: Record<string, unknown>,
    options?: { resubscribe?: boolean }
  ): Promise<() => Promise<void> | void>;
}

export interface HomeAssistant {
  states: Record<string, HassEntity | undefined>;
  language?: string;
  locale?: {
    language?: string;
    time_format?: string;
    number_format?: string;
  };
  config?: {
    unit_system?: {
      temperature?: string;
      length?: string;
      wind_speed?: string;
      pressure?: string;
      precipitation?: string;
    };
    time_zone?: string;
  };
  connection?: HassConnection;
  themes?: {
    darkMode?: boolean;
  };
  formatEntityState?: (stateObj: HassEntity) => string;
  formatEntityAttributeValue?: (stateObj: HassEntity, attribute: string) => string;
}

export interface LovelaceGridOptions {
  columns?: number | 'full';
  rows?: number | 'auto';
  max_columns?: number;
  min_columns?: number;
  min_rows?: number;
  max_rows?: number;
}

export interface LovelaceCard extends HTMLElement {
  hass?: HomeAssistant;
  setConfig(config: SimplePastelWeatherCardConfig): void;
  getCardSize?(): number;
  getGridOptions?(): LovelaceGridOptions;
}

export interface LovelaceCardEditor extends HTMLElement {
  hass?: HomeAssistant;
  setConfig(config: SimplePastelWeatherCardConfig): void;
}

export interface ResolvedStatItem {
  index: number;
  entityId: string;
  value: string;
  unit?: string;
  label?: string;
  icon?: string;
  unavailable: boolean;
  actionConfig: ActionTargetConfig;
}

export interface ResolvedWeatherData {
  hasSource: boolean;
  hasWeatherEntity: boolean;
  condition: WeatherCondition | 'unknown';
  rawCondition?: string;
  hasExplicitCondition: boolean;
  conditionLabelKey: WeatherCondition | 'unknown';
  temperature: string | null;
  temperatureUnit: string;
  name: string;
  isNight: boolean;
  stats: ResolvedStatItem[];
  unavailable: boolean;
}

export interface TranslationSchema {
  card: {
    no_source: string;
    unavailable: string;
    unknown: string;
    sensor_only_no_forecast: string;
    forecast_loading: string;
    forecast_error: string;
    weather_title: string;
    today: string;
  };
  conditions: {
    sunny: string;
    'clear-night': string;
    partlycloudy: string;
    cloudy: string;
    rainy: string;
    pouring: string;
    lightning: string;
    'lightning-rainy': string;
    snowy: string;
    'snowy-rainy': string;
    hail: string;
    fog: string;
    windy: string;
    'windy-variant': string;
    exceptional: string;
    unknown: string;
  };
  editor: {
    section_sources: string;
    section_layout: string;
    section_visibility: string;
    section_forecast: string;
    section_stats: string;
    section_actions: string;
    entity: string;
    entity_helper: string;
    temperature_entity: string;
    temperature_entity_helper: string;
    temperature_attribute: string;
    condition_entity: string;
    condition_entity_helper: string;
    name: string;
    orientation: string;
    orientation_horizontal: string;
    orientation_vertical: string;
    background_mode: string;
    background_dynamic: string;
    background_theme: string;
    background_transparent: string;
    show_icon: string;
    show_temperature: string;
    show_condition: string;
    show_name: string;
    show_stats: string;
    show_forecast: string;
    forecast_type: string;
    forecast_daily: string;
    forecast_hourly: string;
    forecast_items: string;
    forecast_items_helper: string;
    forecast_requires_weather: string;
    stat_slot_1: string;
    stat_slot_2: string;
    stat_slot_3: string;
    stat_entity: string;
    stat_attribute: string;
    stat_label: string;
    stat_icon: string;
    stat_unit: string;
    stat_tap_action: string;
    stat_double_tap_action: string;
    stat_hold_action: string;
    tap_action: string;
    double_tap_action: string;
    hold_action: string;
  };
}
