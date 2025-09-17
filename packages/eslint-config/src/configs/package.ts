import type { FlatConfigItem } from '../types';

import { GLOB_PKG_JSON, GLOB_PKG_JSON5, GLOB_PKG_JSON_ALL, GLOB_PKG_JSONC } from '../globs';
import { pluginJSON, pluginJSONC, pluginPackageJSON } from '../modules';

export async function json(): Promise<FlatConfigItem[]> {
  const files = [GLOB_PKG_JSON_ALL];
  const filesJSON = [GLOB_PKG_JSON];
  const filesJSON5 = [GLOB_PKG_JSON5];
  const filesJSONC = [GLOB_PKG_JSONC];

  return [
    {
      name: 'package/plugin',
      files: files,
      plugins: { 'jsonc': pluginJSONC, 'package-json': pluginPackageJSON },
    },
    {
      name: 'package/config',
      files: files,
      rules: {
        '@typescript-eslint/no-unused-expressions': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        'no-unused-expressions': 'off',
        'no-unused-vars': 'off',
        'strict': 'off',
        ...pluginJSONC.configs['flat/recommended-with-json'],
        ...pluginJSONC.configs['flat/prettier'],
        ...pluginPackageJSON.configs.recommended.rules,
        'package-json/order-properties': 'off',
      },
    },
    {
      ...pluginJSON.configs.recommended.rules,
      ...pluginJSONC.configs['recommended-with-json'].rules,
      ...pluginJSONC.configs.prettier.rules,
      name: 'json/config/json',
      files: filesJSON,
      ignores: ['**/.vscode/**/*.json', '**/package*.json', '**/tsconfig*.json'],
      language: 'json/json',
    },
    {
      ...pluginJSON.configs.recommended.rules,
      ...pluginJSONC.configs['recommended-with-json5'].rules,
      ...pluginJSONC.configs.prettier.rules,
      name: 'json/config/json5',
      files: filesJSON5,
      language: 'json/json5',
    },
    {
      ...pluginJSON.configs.recommended.rules,
      ...pluginJSONC.configs['recommended-with-jsonc'].rules,
      ...pluginJSONC.configs.prettier.rules,
      name: 'json/config/jsonc',
      files: [filesJSONC, '**/.vscode/**/*.json', '**/tsconfig*.json'].flat(),
      language: 'json/jsonc',
    },
  ] satisfies FlatConfigItem[];
}
