import { BackgroundMode, HomeAssistant, WeatherCondition } from '../types';

export interface PastelThemeTokens {
  bg: string;
  text: string;
  muted: string;
  chipBg: string;
  chipBorder: string;
  forecastBg: string;
  border: string;
  shadow: string;
  accent: string;
  divider: string;
}

/**
 * Resolves whether it is currently night using condition, sun.sun, or local clock fallback.
 */
export function resolveIsNight(
  hass: HomeAssistant | undefined,
  condition: WeatherCondition | 'unknown',
  now: Date = new Date()
): boolean {
  if (condition === 'clear-night') {
    return true;
  }

  const sunState = hass?.states?.['sun.sun']?.state;
  if (sunState === 'below_horizon') {
    return true;
  }
  if (sunState === 'above_horizon') {
    return false;
  }

  const hour = now.getHours();
  return hour < 6 || hour >= 20;
}

const DAY_LIGHT_TEXT = '#1E293B';
const DAY_LIGHT_MUTED = '#475569';
const NIGHT_TEXT = '#F4F6FB';
const NIGHT_MUTED = '#C4CEE3';

/**
 * Returns CSS custom property values for the requested background mode, condition, and day/night cycle.
 */
export function getPastelThemeVariables(
  condition: WeatherCondition | 'unknown',
  isNight: boolean,
  backgroundMode: BackgroundMode
): PastelThemeTokens {
  if (backgroundMode === 'transparent') {
    return {
      bg: 'transparent',
      text: 'var(--primary-text-color, #1E293B)',
      muted: 'var(--secondary-text-color, #475569)',
      chipBg: 'rgba(127, 138, 156, 0.12)',
      chipBorder: 'rgba(127, 138, 156, 0.18)',
      forecastBg: 'rgba(127, 138, 156, 0.08)',
      border: 'none',
      shadow: 'none',
      accent: 'var(--primary-color, #7DA8D8)',
      divider: 'rgba(127, 138, 156, 0.2)',
    };
  }

  if (backgroundMode === 'theme') {
    return {
      bg: 'var(--ha-card-background, var(--card-background-color, #FFFFFF))',
      text: 'var(--primary-text-color, #1E293B)',
      muted: 'var(--secondary-text-color, #64748B)',
      chipBg: 'var(--secondary-background-color, rgba(127, 138, 156, 0.09))',
      chipBorder: 'var(--ha-card-border-color, rgba(127, 138, 156, 0.16))',
      forecastBg: 'var(--secondary-background-color, rgba(127, 138, 156, 0.06))',
      border:
        'var(--ha-card-border-width, 1px) solid var(--ha-card-border-color, var(--divider-color, rgba(0, 0, 0, 0.08)))',
      shadow: 'var(--ha-card-box-shadow, none)',
      accent: 'var(--primary-color, #7DA8D8)',
      divider: 'var(--divider-color, rgba(127, 138, 156, 0.16))',
    };
  }

  // Dynamic pastel themes (day vs night)
  if (isNight) {
    switch (condition) {
      case 'sunny':
      case 'clear-night':
        return {
          bg: 'linear-gradient(140deg, #272D45 0%, #3A4266 100%)',
          text: NIGHT_TEXT,
          muted: NIGHT_MUTED,
          chipBg: 'rgba(255, 255, 255, 0.10)',
          chipBorder: 'rgba(255, 255, 255, 0.14)',
          forecastBg: 'rgba(255, 255, 255, 0.07)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          shadow: '0 8px 24px rgba(15, 23, 42, 0.18)',
          accent: '#D6CCFF',
          divider: 'rgba(255, 255, 255, 0.13)',
        };

      case 'partlycloudy':
        return {
          bg: 'linear-gradient(140deg, #2E374D 0%, #404D69 100%)',
          text: NIGHT_TEXT,
          muted: NIGHT_MUTED,
          chipBg: 'rgba(255, 255, 255, 0.10)',
          chipBorder: 'rgba(255, 255, 255, 0.14)',
          forecastBg: 'rgba(255, 255, 255, 0.07)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          shadow: '0 8px 24px rgba(15, 23, 42, 0.18)',
          accent: '#C3D7FA',
          divider: 'rgba(255, 255, 255, 0.13)',
        };

      case 'rainy':
      case 'pouring':
        return {
          bg: 'linear-gradient(140deg, #25344A 0%, #344A68 100%)',
          text: NIGHT_TEXT,
          muted: NIGHT_MUTED,
          chipBg: 'rgba(255, 255, 255, 0.10)',
          chipBorder: 'rgba(255, 255, 255, 0.15)',
          forecastBg: 'rgba(255, 255, 255, 0.07)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          shadow: '0 8px 24px rgba(15, 23, 42, 0.18)',
          accent: '#9BC8F2',
          divider: 'rgba(255, 255, 255, 0.13)',
        };

      case 'lightning':
      case 'lightning-rainy':
        return {
          bg: 'linear-gradient(140deg, #302B48 0%, #453D66 100%)',
          text: NIGHT_TEXT,
          muted: NIGHT_MUTED,
          chipBg: 'rgba(255, 255, 255, 0.10)',
          chipBorder: 'rgba(255, 255, 255, 0.15)',
          forecastBg: 'rgba(255, 255, 255, 0.07)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          shadow: '0 8px 24px rgba(15, 23, 42, 0.18)',
          accent: '#FFE08A',
          divider: 'rgba(255, 255, 255, 0.13)',
        };

      case 'snowy':
      case 'snowy-rainy':
      case 'hail':
        return {
          bg: 'linear-gradient(140deg, #2B3B4E 0%, #3B516A 100%)',
          text: NIGHT_TEXT,
          muted: NIGHT_MUTED,
          chipBg: 'rgba(255, 255, 255, 0.11)',
          chipBorder: 'rgba(255, 255, 255, 0.15)',
          forecastBg: 'rgba(255, 255, 255, 0.08)',
          border: '1px solid rgba(255, 255, 255, 0.13)',
          shadow: '0 8px 24px rgba(15, 23, 42, 0.18)',
          accent: '#CBE5FA',
          divider: 'rgba(255, 255, 255, 0.13)',
        };

      case 'windy':
      case 'windy-variant':
        return {
          bg: 'linear-gradient(140deg, #263B40 0%, #355259 100%)',
          text: NIGHT_TEXT,
          muted: NIGHT_MUTED,
          chipBg: 'rgba(255, 255, 255, 0.10)',
          chipBorder: 'rgba(255, 255, 255, 0.14)',
          forecastBg: 'rgba(255, 255, 255, 0.07)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          shadow: '0 8px 24px rgba(15, 23, 42, 0.18)',
          accent: '#A9DFE5',
          divider: 'rgba(255, 255, 255, 0.13)',
        };

      case 'exceptional':
        return {
          bg: 'linear-gradient(140deg, #432D39 0%, #593C4C 100%)',
          text: NIGHT_TEXT,
          muted: NIGHT_MUTED,
          chipBg: 'rgba(255, 255, 255, 0.10)',
          chipBorder: 'rgba(255, 255, 255, 0.14)',
          forecastBg: 'rgba(255, 255, 255, 0.07)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          shadow: '0 8px 24px rgba(15, 23, 42, 0.18)',
          accent: '#FFB5A7',
          divider: 'rgba(255, 255, 255, 0.13)',
        };

      case 'cloudy':
      case 'fog':
      case 'unknown':
      default:
        return {
          bg: 'linear-gradient(140deg, #303748 0%, #414A5F 100%)',
          text: NIGHT_TEXT,
          muted: NIGHT_MUTED,
          chipBg: 'rgba(255, 255, 255, 0.10)',
          chipBorder: 'rgba(255, 255, 255, 0.14)',
          forecastBg: 'rgba(255, 255, 255, 0.07)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          shadow: '0 8px 24px rgba(15, 23, 42, 0.18)',
          accent: '#CAD7EA',
          divider: 'rgba(255, 255, 255, 0.13)',
        };
    }
  }

  // Daytime pastel palettes
  switch (condition) {
    case 'sunny':
      return {
        bg: 'linear-gradient(140deg, #FFF6E6 0%, #FFE7C7 100%)',
        text: DAY_LIGHT_TEXT,
        muted: DAY_LIGHT_MUTED,
        chipBg: 'rgba(255, 255, 255, 0.58)',
        chipBorder: 'rgba(217, 155, 78, 0.18)',
        forecastBg: 'rgba(255, 255, 255, 0.45)',
        border: '1px solid rgba(217, 155, 78, 0.18)',
        shadow: '0 8px 24px rgba(190, 145, 90, 0.10)',
        accent: '#E39A40',
        divider: 'rgba(148, 108, 56, 0.14)',
      };

    case 'partlycloudy':
      return {
        bg: 'linear-gradient(140deg, #F4F9FF 0%, #E1EEFA 100%)',
        text: DAY_LIGHT_TEXT,
        muted: DAY_LIGHT_MUTED,
        chipBg: 'rgba(255, 255, 255, 0.65)',
        chipBorder: 'rgba(100, 145, 195, 0.16)',
        forecastBg: 'rgba(255, 255, 255, 0.50)',
        border: '1px solid rgba(100, 145, 195, 0.16)',
        shadow: '0 8px 24px rgba(100, 140, 185, 0.10)',
        accent: '#639CD9',
        divider: 'rgba(71, 85, 105, 0.12)',
      };

    case 'rainy':
    case 'pouring':
      return {
        bg: 'linear-gradient(140deg, #EAF3FC 0%, #D4E6F7 100%)',
        text: DAY_LIGHT_TEXT,
        muted: DAY_LIGHT_MUTED,
        chipBg: 'rgba(255, 255, 255, 0.62)',
        chipBorder: 'rgba(90, 138, 190, 0.18)',
        forecastBg: 'rgba(255, 255, 255, 0.46)',
        border: '1px solid rgba(90, 138, 190, 0.18)',
        shadow: '0 8px 24px rgba(80, 125, 175, 0.10)',
        accent: '#5992CC',
        divider: 'rgba(71, 85, 105, 0.13)',
      };

    case 'lightning':
    case 'lightning-rainy':
      return {
        bg: 'linear-gradient(140deg, #F0ECF9 0%, #DFD7F3 100%)',
        text: DAY_LIGHT_TEXT,
        muted: DAY_LIGHT_MUTED,
        chipBg: 'rgba(255, 255, 255, 0.62)',
        chipBorder: 'rgba(128, 109, 178, 0.18)',
        forecastBg: 'rgba(255, 255, 255, 0.46)',
        border: '1px solid rgba(128, 109, 178, 0.18)',
        shadow: '0 8px 24px rgba(115, 96, 165, 0.10)',
        accent: '#7D69B2',
        divider: 'rgba(71, 85, 105, 0.13)',
      };

    case 'snowy':
    case 'snowy-rainy':
    case 'hail':
      return {
        bg: 'linear-gradient(140deg, #F2F9FD 0%, #DFEFF9 100%)',
        text: DAY_LIGHT_TEXT,
        muted: DAY_LIGHT_MUTED,
        chipBg: 'rgba(255, 255, 255, 0.68)',
        chipBorder: 'rgba(110, 162, 204, 0.18)',
        forecastBg: 'rgba(255, 255, 255, 0.52)',
        border: '1px solid rgba(110, 162, 204, 0.18)',
        shadow: '0 8px 24px rgba(105, 155, 195, 0.10)',
        accent: '#6BA7D6',
        divider: 'rgba(71, 85, 105, 0.12)',
      };

    case 'windy':
    case 'windy-variant':
      return {
        bg: 'linear-gradient(140deg, #EBF8F6 0%, #D5EEEA 100%)',
        text: DAY_LIGHT_TEXT,
        muted: DAY_LIGHT_MUTED,
        chipBg: 'rgba(255, 255, 255, 0.64)',
        chipBorder: 'rgba(84, 156, 150, 0.18)',
        forecastBg: 'rgba(255, 255, 255, 0.48)',
        border: '1px solid rgba(84, 156, 150, 0.18)',
        shadow: '0 8px 24px rgba(84, 156, 150, 0.10)',
        accent: '#4F9E98',
        divider: 'rgba(71, 85, 105, 0.12)',
      };

    case 'exceptional':
      return {
        bg: 'linear-gradient(140deg, #FFF0ED 0%, #FFE0D9 100%)',
        text: DAY_LIGHT_TEXT,
        muted: DAY_LIGHT_MUTED,
        chipBg: 'rgba(255, 255, 255, 0.64)',
        chipBorder: 'rgba(209, 107, 94, 0.20)',
        forecastBg: 'rgba(255, 255, 255, 0.48)',
        border: '1px solid rgba(209, 107, 94, 0.20)',
        shadow: '0 8px 24px rgba(190, 100, 90, 0.10)',
        accent: '#D47264',
        divider: 'rgba(71, 85, 105, 0.12)',
      };

    case 'cloudy':
    case 'fog':
    case 'unknown':
    default:
      return {
        bg: 'linear-gradient(140deg, #F2F5F9 0%, #E3EBF3 100%)',
        text: DAY_LIGHT_TEXT,
        muted: DAY_LIGHT_MUTED,
        chipBg: 'rgba(255, 255, 255, 0.65)',
        chipBorder: 'rgba(118, 136, 160, 0.16)',
        forecastBg: 'rgba(255, 255, 255, 0.50)',
        border: '1px solid rgba(118, 136, 160, 0.16)',
        shadow: '0 8px 24px rgba(100, 120, 145, 0.08)',
        accent: '#6F88A6',
        divider: 'rgba(71, 85, 105, 0.12)',
      };
  }
}
