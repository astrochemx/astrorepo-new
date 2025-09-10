import { pluginCollapsibleSections } from '@expressive-code/plugin-collapsible-sections';
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers';
import { defineEcConfig } from 'astro-expressive-code';

/** @type {import('@astrojs/starlight/expressive-code').StarlightExpressiveCodeOptions} */
export default defineEcConfig({
  defaultLocale: 'en-US',
  defaultProps: {
    collapseStyle: 'collapsible-auto',
    overridesByLang: {
      'ansi,bash,bat,batch,cmd,console,fish,powershell,ps,ps1,psd1,psm1,pwsh,sh,shell,shellscript,shellsession,text,zsh':
        {
          showLineNumbers: false,
        },
    },
    preserveIndent: true,
    showLineNumbers: true,
    wrap: false,
  },
  minSyntaxHighlightingColorContrast: 5.5,
  plugins: [pluginCollapsibleSections(), pluginLineNumbers()],
  styleOverrides: {
    borderRadius: '0.5rem',
  },
  tabWidth: 2,
  // themeCssSelector: (theme) => `[data-theme='${theme.name}']`,
  themeCssSelector: (theme) => `[data-theme="${theme.name.split('-')[1]}"]`,
  themes: ['github-dark', 'github-light'],
  useDarkModeMediaQuery: true,
  useStyleReset: true,
});
