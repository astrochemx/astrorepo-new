import { tailwind4 } from 'tailwind-csstree';

import type { FlatConfigItem } from '../types';

import { GLOB_STYLE } from '../globs';
import { pluginCSS } from '../modules';

export async function css(): Promise<FlatConfigItem[]> {
  const files = [GLOB_STYLE];

  return [
    {
      name: 'css/plugin',
      files: files,
      plugins: { css: pluginCSS },
    },
    {
      ...pluginCSS.configs.recommended,
      name: 'css/config',
      files: files,
      language: 'css/css',
      languageOptions: {
        customSyntax: tailwind4,
      },
    },
    {
      name: 'css/overrides',
      files: files,
      rules: {
        'css/no-important': 'off',
      },
    },
  ] satisfies FlatConfigItem[];
}
