import type { FlatConfigItem } from '../types';

import { GLOB_ASTRO_ALL, GLOB_SRC_JTS, GLOB_SVELTE_ALL, GLOB_VUE } from '../globs';
import { pluginCommentsConfigs, pluginComments } from '../modules';

export async function comments(): Promise<FlatConfigItem[]> {
  const files = [...GLOB_ASTRO_ALL, GLOB_SRC_JTS, GLOB_SVELTE_ALL, GLOB_VUE];

  return [
    {
      name: 'comments/plugin',
      files: files,
      plugins: { comments: pluginComments },
    },
    // @ts-expect-error: types
    {
      ...pluginCommentsConfigs.recommended,
      name: 'comments/config',
      files: files,
    },
    {
      name: 'comments/overrides',
      files: files,
      rules: {
        '@eslint-community/eslint-comments/disable-enable-pair': 'off',
      },
    },
  ] satisfies FlatConfigItem[];
}
