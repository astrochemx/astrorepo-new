import type { FlatConfigItem } from '../types';

import { GLOB_ASTRO_ALL, GLOB_MDX, GLOB_SRC_JTS, GLOB_SVELTE_ALL, GLOB_VUE } from '../globs';
import { loadPlugin } from '../utils';

const pluginUnusedImports = await loadPlugin<typeof import('eslint-plugin-unused-imports')>(
  'eslint-plugin-unused-imports',
);

export async function unusedImports(): Promise<FlatConfigItem[]> {
  const files = [...GLOB_ASTRO_ALL, GLOB_MDX, GLOB_SRC_JTS, GLOB_SVELTE_ALL, GLOB_VUE];

  return [
    {
      name: 'unused-imports/plugin',
      files: files,
      plugins: { 'unused-imports': pluginUnusedImports },
    },
    {
      name: 'unused-imports/config',
      files: files,
      rules: {
        'unused-imports/no-unused-imports': 'warn',
        'unused-imports/no-unused-vars': [
          'warn',
          {
            args: 'after-used',
            argsIgnorePattern: '^_',
            vars: 'all',
            varsIgnorePattern: '^_',
          },
        ],
      },
    },
    {
      name: 'unused-imports/overrides',
      files: files,
      rules: {
        '@typescript-eslint/no-unused-vars': 'off',
        'no-unused-vars': 'off',
      },
    },
  ] satisfies FlatConfigItem[];
}
