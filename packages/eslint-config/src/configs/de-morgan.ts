import type { FlatConfigItem } from '../types';

import { GLOB_SRC_JTS } from '../globs';
import { loadPlugin } from '../utils';

const pluginDeMorgan =
  await loadPlugin<typeof import('eslint-plugin-de-morgan')>('eslint-plugin-de-morgan');

export async function deMorgan(): Promise<FlatConfigItem[]> {
  const files = [GLOB_SRC_JTS];

  return [
    {
      name: 'de-morgan/plugin',
      files: files,
      plugins: { 'de-morgan': pluginDeMorgan },
    },
    {
      ...pluginDeMorgan.configs.recommended,
      name: 'de-morgan/config',
      files: files,
      plugins: {},
      rules: {
        ...pluginDeMorgan.configs.recommended.rules,
      },
    },
  ] satisfies FlatConfigItem[];
}
