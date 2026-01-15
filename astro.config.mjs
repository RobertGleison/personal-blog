// @ts-check
import { defineConfig } from 'astro/config';
import expressiveCode from 'astro-expressive-code';
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers';

// https://astro.build/config
export default defineConfig({
  integrations: [
    expressiveCode({
      plugins: [pluginLineNumbers()],
      themes: ['github-dark'],
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
