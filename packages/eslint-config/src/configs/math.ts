import type { FlatConfigItem } from '../types';

import { GLOB_SRC_JTS } from '../globs';
import { loadPlugin } from '../utils';

const pluginMath = await loadPlugin<typeof import('eslint-plugin-math')>('eslint-plugin-math');

export async function math(): Promise<FlatConfigItem[]> {
  const files = [GLOB_SRC_JTS];

  return [
    {
      name: 'math/plugin',
      files: files,
      plugins: { math: pluginMath },
    },
    {
      ...pluginMath.configs.recommended,
      name: 'math/config',
      files: files,
      plugins: {},
      rules: {
        ...pluginMath.configs.recommended.rules,
      },
    },
  ] satisfies FlatConfigItem[];
}
