import { defineConfig } from './src';
import type { FlatConfigItem } from './src/types';

const config: ReturnType<typeof defineConfig> = defineConfig({
  astro: true,
  command: true,
  typescript: true,
}) satisfies Promise<FlatConfigItem[]>;

export default config;
