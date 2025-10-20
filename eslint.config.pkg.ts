import type { FlatConfigItem } from '@astrochemx/eslint-config';

import { defineConfig } from '@astrochemx/eslint-config';

export default (await defineConfig()) satisfies FlatConfigItem[];
