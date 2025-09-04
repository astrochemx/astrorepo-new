import { GLOB_SRC_JS } from '../globs';
import { globals, pluginJS } from '../modules';
import type { FlatConfigItem } from '../types';

export async function javascript(): Promise<FlatConfigItem[]> {
  const files = [GLOB_SRC_JS];

  return [
    {
      name: 'javascript/parser',
      files: files,
      languageOptions: {
        ecmaVersion: 'latest',
        globals: {
          ...globals.browser,
          ...globals.es2026,
          ...globals.node,
          ...globals['shared-node-browser'],
          document: 'readonly',
          navigator: 'readonly',
          window: 'readonly',
        },
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
          ecmaVersion: 'latest',
          sourceType: 'module',
        },
        sourceType: 'module',
      },
    },
    {
      name: 'javascript/rules',
      files: files,
      rules: pluginJS.configs.recommended.rules,
    },
  ];
}
