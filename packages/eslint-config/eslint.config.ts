import type { FlatConfigItem } from './src/types';

import { defineConfig } from './src';

const config: ReturnType<typeof defineConfig> = defineConfig({
  astro: true,
  command: true,
  typescript: true,
}) satisfies Promise<FlatConfigItem[]>;

export default config;
