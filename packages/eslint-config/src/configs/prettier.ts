import type { FlatConfigItem } from '../types';

import { GLOB_SRC_ALL } from '../globs';
import { loadPlugin } from '../utils';

const [pluginPrettier, pluginPrettierRecommended] = await Promise.all([
  loadPlugin<typeof import('eslint-plugin-prettier')>('eslint-plugin-prettier'),
  loadPlugin<typeof import('eslint-plugin-prettier/recommended')>(
    'eslint-plugin-prettier/recommended',
  ),
] as const);

export async function prettier(): Promise<FlatConfigItem[]> {
  const files = [...GLOB_SRC_ALL].flat();

  return [
    {
      name: 'prettier/plugin',
      files: files,
      plugins: { prettier: pluginPrettier },
    },
    {
      ...pluginPrettierRecommended,
      name: 'prettier/config',
      files: files,
    },
  ] satisfies FlatConfigItem[];
}
