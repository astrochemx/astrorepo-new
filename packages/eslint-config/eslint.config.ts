import type { FlatConfigItem } from './src/types';

import { defineConfig } from './src';

const config: ReturnType<typeof defineConfig> = defineConfig({
  astro: true,
  command: true,
  jsdoc: true,
  packageJSON: true,
  perfectionist: true,
  regexp: true,
  typescript: true,
  unicorn: true,
  vue: true,
  warnings: true,
}) satisfies Promise<FlatConfigItem[]>;

export default config;
