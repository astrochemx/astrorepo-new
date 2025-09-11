import type { FlatConfigItem } from '../types';

import { GLOB_ASTRO_ALL, GLOB_SRC_JTS, GLOB_SVELTE_ALL, GLOB_VUE } from '../globs';
import { pluginPerfectionist } from '../modules';

export async function perfectionist(): Promise<FlatConfigItem[]> {
  const files = [...GLOB_ASTRO_ALL, GLOB_SRC_JTS, GLOB_SVELTE_ALL, GLOB_VUE];

  return [
    {
      ...pluginPerfectionist.configs['recommended-natural'],
      files: files,
      name: 'perfectionist/plugin',
      plugins: {
        perfectionist: pluginPerfectionist,
      },
    },
  ] satisfies FlatConfigItem[];
}
