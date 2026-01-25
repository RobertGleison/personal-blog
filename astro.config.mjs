// @ts-check
import { defineConfig } from 'astro/config';
import expressiveCode from 'astro-expressive-code';
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers';

// https://astro.build/config
export default defineConfig({
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'pt'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    expressiveCode({
      plugins: [pluginLineNumbers()],
      styleOverrides: {
        borderRadius: '6px',
        codeFontFamily: "'JetBrains Mono', monospace",
      },
      defaultProps: {
        showLineNumbers: true,
      },
    }),
  ],
});
