export const locales = ['en', 'pt'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'en',
  pt: 'pt-BR',
};

export const localeFlags: Record<Locale, string> = {
  en: '🇺🇸',
  pt: '🇧🇷',
};

export const dateLocales: Record<Locale, string> = {
  en: 'en-US',
  pt: 'pt-BR',
};
