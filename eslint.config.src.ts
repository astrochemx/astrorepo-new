import type { FlatConfigItem } from './packages/eslint-config/src';

import eslintConfig from './packages/eslint-config/eslint.config';

export default (await eslintConfig) satisfies FlatConfigItem[];
