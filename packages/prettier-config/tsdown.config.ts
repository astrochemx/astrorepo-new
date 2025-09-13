import type { UserConfig, UserConfigFn } from 'tsdown';

import { tsdownConfig } from '@astrochemx/tsdown-config';

const config: UserConfig | UserConfigFn = tsdownConfig satisfies UserConfig | UserConfigFn;

export default config;
