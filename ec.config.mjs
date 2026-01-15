import { defineEcConfig } from 'astro-expressive-code';

export default defineEcConfig({
  themes: ['github-light', 'github-dark'],
  useDarkModeMediaQuery: false,
  themeCssSelector: (theme, { styleVariants }) => {
    if (styleVariants.length >= 2) {
      const themeIndex = styleVariants.findIndex(v => v.theme === theme);
      if (themeIndex === 0) return ':root:not([data-theme="dark"])';
      if (themeIndex === 1) return ':root[data-theme="dark"]';
    }
    return '';
  },
  styleOverrides: {
    borderRadius: '6px',
    codeFontFamily: "'JetBrains Mono', monospace",
    codeBackground: ({ theme }) => theme.name === 'github-light' ? '#f6f8fa' : '#0d1117',
    frames: {
      editorBackground: ({ theme }) => theme.name === 'github-light' ? '#f6f8fa' : '#0d1117',
    },
  },
  defaultProps: {
    showLineNumbers: true,
  },
});
