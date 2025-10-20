import type { FlatConfigItem } from '../types';

import { GLOB_PKG_JSON_ALL, GLOB_PNPM_YAML } from '../globs';
import { loadPlugin } from '../utils';

const [pluginPNPM, parserJSONC, parserYAML] = await Promise.all([
  loadPlugin<typeof import('eslint-plugin-pnpm')>('eslint-plugin-pnpm'),
  loadPlugin<typeof import('jsonc-eslint-parser')>('jsonc-eslint-parser'),
  loadPlugin<typeof import('yaml-eslint-parser')>('yaml-eslint-parser'),
] as const);

export async function pnpm(): Promise<FlatConfigItem[]> {
  const files = [GLOB_PKG_JSON_ALL, GLOB_PNPM_YAML];
  const filesJSON = [GLOB_PKG_JSON_ALL];
  const filesYAML = [GLOB_PNPM_YAML];

  return [
    {
      name: 'pnpm/plugin',
      files: files,
      plugins: { pnpm: pluginPNPM },
      settings: {
        ensureWorkspaceFile: false,
      },
    },
    {
      name: 'pnpm/paser/json',
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
      name: 'pnpm/paser/yaml',
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
      ...(pluginPNPM.configs?.['json'] ?? {
        rules: {
          'pnpm/json-enforce-catalog': 'warn',
          'pnpm/json-prefer-workspace-settings': 'warn',
          'pnpm/json-valid-catalog': 'warn',
        },
      }),
      name: 'pnpm/config/json',
      files: filesJSON,
    },
    {
      ...(pluginPNPM.configs?.['yaml'] ?? {
        rules: {
          'pnpm/yaml-no-duplicate-catalog-item': 'warn',
          'pnpm/yaml-no-unused-catalog-item': 'warn',
        },
      }),
      name: 'pnpm/config/yaml',
      files: filesYAML,
    },
  ] satisfies FlatConfigItem[];
}
