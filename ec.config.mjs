import { defineEcConfig } from 'astro-expressive-code';

export default defineEcConfig({
  themes: ['github-dark'],
  styleOverrides: {
    borderRadius: '6px',
    codeFontFamily: "'JetBrains Mono', monospace",
  },
  defaultProps: {
    showLineNumbers: true,
  },
});
