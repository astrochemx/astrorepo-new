import { tsdownConfig } from '@astrochemx/tsdown-config';
import type { UserConfig, UserConfigFn } from 'tsdown';

const config: UserConfig | UserConfigFn = tsdownConfig satisfies UserConfig | UserConfigFn;

export default config;
