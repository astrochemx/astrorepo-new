// @ts-check
/** @import {Configuration} from 'lint-staged' */

/** @type {Configuration} */
export default /** @type {const} @satisfies {Configuration} */ {
  disabled: [() => 'pnpm run check'],
};
