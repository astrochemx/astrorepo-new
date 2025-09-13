import type { UserConfig, UserConfigFn } from 'tsdown';

import { tsdownConfig } from '@astrochemx/tsdown-config';

const config: UserConfig | UserConfigFn = {
  ...tsdownConfig,
  // copy: [
  //   'words.txt',
  //   { from: './words.txt', to: './dist/words.txt' },
  // ],
} satisfies UserConfig | UserConfigFn;

export default config;
