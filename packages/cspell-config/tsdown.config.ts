import { tsdownConfig } from '@astrochemx/tsdown-config';
import type { UserConfig, UserConfigFn } from 'tsdown';

const config: UserConfig | UserConfigFn = {
  ...tsdownConfig,
  // copy: [
  //   'words.txt',
  //   { from: './words.txt', to: './dist/words.txt' },
  // ],
} satisfies UserConfig | UserConfigFn;

export default config;
