import { toIntlLocale } from './localize/localize';
import {
  ForecastEntry,
  ForecastEvent,
  ForecastType,
  HomeAssistant,
  Orientation,
  SupportedLanguage,
} from './types';

/**
 * Safely parses date strings, avoiding UTC midnight shift on YYYY-MM-DD strings.
 */
export function parseLocalDate(dateStr: string): Date | null {
  if (!dateStr || typeof dateStr !== 'string') return null;

  const dateOnlyMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateStr.trim());
  if (dateOnlyMatch) {
    const year = Number(dateOnlyMatch[1]);
    const month = Number(dateOnlyMatch[2]);
    const day = Number(dateOnlyMatch[3]);
    const localDate = new Date(year, month - 1, day, 12, 0, 0, 0);
    return Number.isNaN(localDate.getTime()) ? null : localDate;
  }

  const parsed = new Date(dateStr);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

/**
 * Formats the forecast timestamp into a concise weekday or hour label.
 */
export function formatForecastLabel(
  entry: ForecastEntry,
  type: ForecastType,
  lang: SupportedLanguage
): string {
  const date = parseLocalDate(entry.datetime);
  if (!date) return '';

  const locale = toIntlLocale(lang);
  if (type === 'hourly') {
    return new Intl.DateTimeFormat(locale, {
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  }

  const label = new Intl.DateTimeFormat(locale, {
    weekday: 'short',
  }).format(date);
  return label.replace(/\.$/, '');
}

/**
 * Computes how many forecast items fit cleanly inside the measured container dimensions.
 */
export function computeAdaptiveForecastCount(
  width: number,
  height: number,
  orientation: Orientation,
  configuredMax?: number
): number {
  const safeWidth = Number.isFinite(width) && width > 0 ? width : 480;
  const safeHeight = Number.isFinite(height) && height > 0 ? height : 140;

  let autoCount: number;
  if (orientation === 'horizontal') {
    const availableWidth = Math.max(120, safeWidth - 210);
    autoCount = Math.floor(availableWidth / 58);
  } else {
    const availableHeight = Math.max(70, safeHeight - 132);
    autoCount = Math.floor(availableHeight / 32);
  }

  const clampedAuto = Math.max(2, Math.min(7, autoCount));
  if (typeof configuredMax === 'number' && Number.isFinite(configuredMax) && configuredMax > 0) {
    return Math.max(1, Math.min(Math.floor(configuredMax), clampedAuto));
  }

  return clampedAuto;
}

export interface ForecastSubscriptionCallbacks {
  onData: (items: ForecastEntry[]) => void;
  onError: () => void;
  onLoading: (loading: boolean) => void;
}

/**
 * Manages a single Home Assistant weather/subscribe_forecast WebSocket subscription.
 * Prevents leaked subscriptions when disconnected before the subscribe promise resolves.
 */
export class ForecastSubscriptionManager {
  private _unsubscribe?: () => Promise<void> | void;
  private _activeKey?: string;
  private _generation = 0;
  private _disposed = false;

  public async sync(
    hass: HomeAssistant | undefined,
    entityId: string | undefined,
    forecastType: ForecastType,
    enabled: boolean,
    callbacks: ForecastSubscriptionCallbacks
  ): Promise<void> {
    if (!enabled || !entityId || !hass?.connection) {
      await this.clear();
      callbacks.onData([]);
      callbacks.onLoading(false);
      return;
    }

    const nextKey = `${entityId}::${forecastType}`;
    if (this._activeKey === nextKey && this._unsubscribe) {
      return;
    }

    await this.clear();
    this._disposed = false;
    this._activeKey = nextKey;
    const myGen = ++this._generation;
    callbacks.onLoading(true);

    try {
      const unsub = await hass.connection.subscribeMessage<ForecastEvent>(
        (event) => {
          if (this._disposed || myGen !== this._generation) return;
          callbacks.onLoading(false);
          callbacks.onData(Array.isArray(event?.forecast) ? event.forecast : []);
        },
        {
          type: 'weather/subscribe_forecast',
          forecast_type: forecastType,
          entity_id: entityId,
        }
      );

      if (this._disposed || myGen !== this._generation) {
        await Promise.resolve(unsub());
        return;
      }

      this._unsubscribe = unsub;
    } catch {
      if (this._disposed || myGen !== this._generation) return;
      this._activeKey = undefined;
      callbacks.onLoading(false);
      callbacks.onError();
    }
  }

  public async clear(): Promise<void> {
    this._generation += 1;
    this._activeKey = undefined;
    const unsub = this._unsubscribe;
    this._unsubscribe = undefined;
    if (unsub) {
      try {
        await Promise.resolve(unsub());
      } catch {
        // Ignore teardown errors on already-closed connections
      }
    }
  }

  public async destroy(): Promise<void> {
    this._disposed = true;
    await this.clear();
  }
}
