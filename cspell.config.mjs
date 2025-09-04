// @ts-check
/** @import {CSpellSettings} from 'cspell' */

import { cspellConfig } from '@astrochemx/cspell-config';

/** @type {CSpellSettings} */
export default /** @type {const} @satisfies {CSpellSettings} */ {
  ...cspellConfig,
  ignorePaths: [
    ...(cspellConfig.ignorePaths ?? []),
    // dotfiles
    '**/dotfiles/preferences/**',
    '**/dotfiles/scripts/**',
    // globs
    '**/globs.ts',
  ],
};
