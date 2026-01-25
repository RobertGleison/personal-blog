import type { Locale } from './config';
import { defaultLocale, dateLocales } from './config';
import en from './translations/en.json';
import pt from './translations/pt.json';

const translations: Record<Locale, typeof en> = { en, pt };

type TranslationKey = string;

export function translate(locale: Locale, key: TranslationKey): string {
  const keys = key.split('.');
  let value: unknown = translations[locale] || translations[defaultLocale];

  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = (value as Record<string, unknown>)[k];
    } else {
      console.warn(`Translation missing for key: ${key} in locale: ${locale}`);
      return key;
    }
  }

  if (typeof value !== 'string') {
    console.warn(`Translation value is not a string for key: ${key} in locale: ${locale}`);
    return key;
  }

  return value;
}

export function formatDate(date: Date, locale: Locale): string {
  return date.toLocaleDateString(dateLocales[locale], {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function getLocalizedPath(path: string, locale: Locale): string {
  const cleanPath = path.replace(/^\/(en|pt)/, '');
  if (locale === defaultLocale) {
    return cleanPath || '/';
  }
  return `/${locale}${cleanPath || '/'}`;
}

export function getAlternateLocale(currentLocale: Locale): Locale {
  return currentLocale === 'en' ? 'pt' : 'en';
}

export function getLocaleFromPath(path: string): Locale {
  const match = path.match(/^\/(pt)(?:\/|$)/);
  return (match?.[1] as Locale) || defaultLocale;
}

export function getLocalePrefix(locale: Locale): string {
  return locale === defaultLocale ? '' : `/${locale}`;
}
