import type { UserConfig, UserConfigFn } from 'tsdown';
import { tsdownConfig } from './src/main.ts';

const config: UserConfig | UserConfigFn = tsdownConfig satisfies UserConfig | UserConfigFn;

export default config;
