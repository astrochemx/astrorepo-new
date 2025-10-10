import type { FlatConfigItem } from './packages/eslint-config/src';

import { defineConfig } from './packages/eslint-config/src';

export default [...(await defineConfig())] as const satisfies FlatConfigItem[];
