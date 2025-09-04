import { GLOB_ASTRO_ALL, GLOB_SRC_JTS, GLOB_SVELTE_ALL, GLOB_VUE } from '../globs';
import { pluginCommandConfig } from '../modules';
import type { FlatConfigItem } from '../types';

export async function command(): Promise<FlatConfigItem[]> {
  const files = [...GLOB_ASTRO_ALL, GLOB_SRC_JTS, GLOB_SVELTE_ALL, GLOB_VUE];

  return [
    {
      ...pluginCommandConfig(),
      name: 'command/plugin',
      files: files,
    },
  ] satisfies FlatConfigItem[];
}
