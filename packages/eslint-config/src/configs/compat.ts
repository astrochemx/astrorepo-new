import globals from 'globals';

import type { FlatConfigItem } from '../types';

import { GLOB_SRC } from '../globs';
import { loadPlugin } from '../utils';

const pluginCompat =
  await loadPlugin<typeof import('eslint-plugin-compat')>('eslint-plugin-compat');

export async function compat(): Promise<FlatConfigItem[]> {
  const files = GLOB_SRC;

  return [
    {
      name: 'compat/plugin',
      files: files,
      plugins: { compat: pluginCompat },
    },
    {
      ...pluginCompat.configs['flat/recommended'],
      name: 'compat/config',
      files: files,
      languageOptions: {
        ...pluginCompat.configs['flat/recommended'].languageOptions,
        globals: {
          ...pluginCompat.configs['flat/recommended'].languageOptions?.globals,
          ...globals.browser,
        },
      },
      plugins: {},
    },
  ] satisfies FlatConfigItem[];
}
