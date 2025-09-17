import type { FlatConfigItem } from '../types';

import { GLOB_ASTRO_ALL, GLOB_SRC_JTS, GLOB_SVELTE_ALL, GLOB_VUE } from '../globs';
import { pluginImportLite, pluginSimpleImportSort, pluginUnusedImports } from '../modules';

export async function imports(): Promise<FlatConfigItem[]> {
  const files = [...GLOB_ASTRO_ALL, GLOB_SRC_JTS, GLOB_SVELTE_ALL, GLOB_VUE];

  return [
    {
      name: 'import-lite/plugin',
      files: files,
      plugins: { import: pluginImportLite },
    },
    {
      ...pluginImportLite.configs.recommended,
      name: 'import-lite/config',
      files: files,
      rules: {
        ...pluginImportLite.configs.recommended.rules,
        'import-lite/consistent-type-specifier-style': 'warn',
        'import-lite/first': 'warn',
        'import-lite/newline-after-import': 'warn',
        'import-lite/no-default-export': 'warn',
        'import-lite/no-duplicates': 'warn',
        'import-lite/no-mutable-exports': 'off',
        'import-lite/no-named-default': 'warn',
      },
    },
    {
      name: 'simple-import-sort/plugin',
      files: files,
      plugins: { 'simple-import-sort': pluginSimpleImportSort },
    },
    {
      name: 'simple-import-sort/config',
      files: files,
      rules: {
        'simple-import-sort/exports': 'off',
        'simple-import-sort/imports': 'off',
      },
    },
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
