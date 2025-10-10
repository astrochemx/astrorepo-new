import type { FlatConfigItem } from '../types';

import { GLOB_SRC } from '../globs';
import { loadPlugin } from '../utils';

const pluginUnicorn =
  await loadPlugin<typeof import('eslint-plugin-unicorn')>('eslint-plugin-unicorn');

export async function unicorn(): Promise<FlatConfigItem[]> {
  const files = [...GLOB_SRC];

  return [
    {
      name: 'unicorn/plugin',
      files: files,
      plugins: { unicorn: pluginUnicorn },
    },
    {
      ...pluginUnicorn.configs.unopinionated,
      name: 'unicorn/config',
      files: files,
      plugins: {},
    },
    {
      name: 'unicorn/overrides',
      files: files,
      rules: {
        'unicorn/import-style': 'warn',
        'unicorn/no-array-reduce': 'warn',
        'unicorn/no-empty-file': 'warn',
        'unicorn/no-nested-ternary': 'warn',
        'unicorn/no-process-exit': 'off',
        'unicorn/prefer-regexp-test': 'warn',
        'unicorn/prefer-string-raw': 'warn',
        'unicorn/prevent-abbreviations': 'off',
      },
    },
  ] satisfies FlatConfigItem[];
}
