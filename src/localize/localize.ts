import { SupportedLanguage, TranslationSchema } from '../types';
import { de } from './languages/de';
import { en } from './languages/en';
import { es } from './languages/es';
import { fr } from './languages/fr';
import { it } from './languages/it';
import { nl } from './languages/nl';
import { pl } from './languages/pl';
import { pt } from './languages/pt';
import { ru } from './languages/ru';
import { zhHans } from './languages/zh-Hans';

export const TRANSLATIONS: Record<SupportedLanguage, TranslationSchema> = {
  en,
  es,
  'zh-Hans': zhHans,
  de,
  it,
  fr,
  pt,
  ru,
  pl,
  nl,
};

export const SUPPORTED_LANGUAGES: readonly SupportedLanguage[] = [
  'en',
  'es',
  'zh-Hans',
  'de',
  'it',
  'fr',
  'pt',
  'ru',
  'pl',
  'nl',
];

/**
 * Resolves a Home Assistant locale language code to one of the 10 supported languages.
 */
export function resolveLanguage(hassLang?: string): SupportedLanguage {
  if (!hassLang) return 'en';
  const normalized = hassLang.trim().replace('_', '-').toLowerCase();

  if (normalized === 'zh-hans' || normalized === 'zh-cn' || normalized === 'zh-sg' || normalized === 'zh') {
    return 'zh-Hans';
  }

  const base = normalized.split('-')[0];
  const direct = SUPPORTED_LANGUAGES.find((lang) => lang.toLowerCase() === normalized);
  if (direct) return direct;

  const baseMatch = SUPPORTED_LANGUAGES.find((lang) => lang.toLowerCase() === base);
  return baseMatch ?? 'en';
}

function getNestedValue(obj: unknown, path: string[]): string | undefined {
  let current: unknown = obj;
  for (const segment of path) {
    if (current && typeof current === 'object' && segment in (current as Record<string, unknown>)) {
      current = (current as Record<string, unknown>)[segment];
    } else {
      return undefined;
    }
  }
  return typeof current === 'string' ? current : undefined;
}

/**
 * Resolves a hierarchical translation key (e.g. 'editor.orientation') with fallback to English.
 */
export function localize(key: string, lang: SupportedLanguage): string {
  const path = key.split('.');
  const value = getNestedValue(TRANSLATIONS[lang], path);
  if (value !== undefined) return value;

  const fallback = getNestedValue(TRANSLATIONS.en, path);
  return fallback ?? key;
}

/**
 * Maps a resolved language code to a BCP 47 tag suitable for Intl.DateTimeFormat.
 */
export function toIntlLocale(lang: SupportedLanguage): string {
  return lang === 'zh-Hans' ? 'zh-CN' : lang;
}
