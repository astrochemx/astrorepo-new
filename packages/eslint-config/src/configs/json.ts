import type { FlatConfigItem } from '../types';

import { GLOB_JSON, GLOB_JSON5, GLOB_JSON_ALL, GLOB_JSONC } from '../globs';
import { pluginJSON, pluginJSONC } from '../modules';
import { extractRules } from '../utils';

const jsonRules = extractRules(pluginJSONC.configs['recommended-with-json']);
const json5Rules = extractRules(pluginJSONC.configs['recommended-with-json5']);
const jsoncRules = extractRules(pluginJSONC.configs['recommended-with-jsonc']);
const prettierRules = extractRules(pluginJSONC.configs.prettier);

export async function json(): Promise<FlatConfigItem[]> {
  const files = [GLOB_JSON_ALL];
  const filesJSON = [GLOB_JSON];
  const filesJSONC = [GLOB_JSONC];
  const filesJSON5 = [GLOB_JSON5];

  return [
    {
      name: 'json/plugin',
      files: files,
      ignores: ['**/package*.json'],
      plugins: { json: pluginJSON, jsonc: pluginJSONC },
    },
    {
      name: 'json/config',
      files: files,
      rules: {
        '@typescript-eslint/no-unused-expressions': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        'no-unused-expressions': 'off',
        'no-unused-vars': 'off',
        'strict': 'off',
      },
    },
    {
      ...pluginJSON.configs.recommended,
      ...pluginJSONC.configs['recommended-with-json'],
      ...pluginJSONC.configs.prettier,
      name: 'json/config/json',
      files: filesJSON,
      ignores: ['**/.vscode/**/*.json', '**/package*.json', '**/tsconfig*.json'],
      language: 'json/json',
    },
    {
      ...pluginJSON.configs.recommended,
      ...pluginJSONC.configs['recommended-with-json5'],
      ...pluginJSONC.configs.prettier,
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
