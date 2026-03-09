export const locales = ['en', 'pt-br'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'en',
  'pt-br': 'pt-BR',
};

export const localeFlags: Record<Locale, string> = {
  en: '🇺🇸',
  'pt-br': '🇧🇷',
};

export const dateLocales: Record<Locale, string> = {
  en: 'en-US',
  'pt-br': 'pt-BR',
};
