import type { FlatConfigItem } from '../types';

import { GLOB_ASTRO_ALL, GLOB_SRC_JTS, GLOB_SVELTE_ALL, GLOB_VUE } from '../globs';
import { pluginCompat } from '../modules';

export async function compat(): Promise<FlatConfigItem[]> {
  const files = [...GLOB_ASTRO_ALL, GLOB_SRC_JTS, GLOB_SVELTE_ALL, GLOB_VUE];

  return [
    {
      name: 'compat/plugin',
      files: files,
      plugins: { compat: pluginCompat },
    },
    {
      ...pluginCompat.configs['flat/recommended'],
      name: 'compat/config',
      files: files,
    },
  ] satisfies FlatConfigItem[];
}
