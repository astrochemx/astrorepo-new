import type { FlatConfigItem } from '../types';

import { GLOB_JSON_ALL, GLOB_TOML, GLOB_YAML } from '../globs';
import { loadPlugin } from '../utils';

const [pluginJsonSchemaValidator, parserJSONC, parserTOML, parserYAML] = await Promise.all([
  loadPlugin<typeof import('eslint-plugin-json-schema-validator')>(
    'eslint-plugin-json-schema-validator',
  ),
  loadPlugin<typeof import('jsonc-eslint-parser')>('jsonc-eslint-parser'),
  loadPlugin<typeof import('toml-eslint-parser')>('toml-eslint-parser'),
  loadPlugin<typeof import('yaml-eslint-parser')>('yaml-eslint-parser'),
] as const);

export async function jsonSchemaValidator(): Promise<FlatConfigItem[]> {
  const files = [GLOB_JSON_ALL, GLOB_TOML, GLOB_YAML];
  const filesJSON = [GLOB_JSON_ALL];
  const filesTOML = [GLOB_TOML];
  const filesYAML = [GLOB_YAML];

  return [
    {
      name: 'json-schema-validator/plugin',
      files: files,
      plugins: { 'json-schema-validator': pluginJsonSchemaValidator },
    },
    {
      name: 'json-schema-validator/paser/json',
      files: filesJSON,
      languageOptions: {
        parser: parserJSONC,
      },
      rules: {
        '@typescript-eslint/no-unused-expressions': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        'no-unused-expressions': 'off',
        'no-unused-vars': 'off',
        'strict': 'off',
      },
    },
    {
      name: 'json-schema-validator/paser/toml',
      files: filesTOML,
      languageOptions: {
        parser: parserTOML,
      },
      rules: {
        'no-irregular-whitespace': 'off',
        'spaced-comment': 'off',
      },
    },
    {
      name: 'json-schema-validator/paser/yaml',
      files: filesYAML,
      languageOptions: {
        parser: parserYAML,
      },
      rules: {
        '@typescript-eslint/no-unused-vars': 'off',
        'no-irregular-whitespace': 'off',
        'no-unused-vars': 'off',
        'spaced-comment': 'off',
      },
    },
    {
      name: 'json-schema-validator/config',
      files: files,
      rules: {
        'json-schema-validator/no-invalid': 'warn',
      },
    },
  ] satisfies FlatConfigItem[];
}
