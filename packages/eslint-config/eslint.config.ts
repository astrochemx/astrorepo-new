import type { FlatConfigItem } from './src/types';

import { defineConfig } from './src';

const config: ReturnType<typeof defineConfig> = defineConfig() satisfies Promise<FlatConfigItem[]>;

export default config;
