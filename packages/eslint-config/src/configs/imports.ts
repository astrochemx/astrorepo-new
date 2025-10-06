import type { FlatConfigItem } from '../types';

import { GLOB_SRC } from '../globs';
import { loadPlugin } from '../utils';

const pluginImportLite = await loadPlugin<typeof import('eslint-plugin-import-lite')>(
  'eslint-plugin-import-lite',
);

export async function imports(): Promise<FlatConfigItem[]> {
  const files = GLOB_SRC;

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
  ] satisfies FlatConfigItem[];
}
