// @ts-check
/** @import {SGHConfig} from './packages/common/src/types/simple-git-hooks' */

/** @type {SGHConfig} */
export default /** @type {const} @satisfies {Config} */ {
  'pre-commit': 'pnpx lint-staged@latest',
  'commit-msg': 'pnpx commitlint@latest --edit "$1"',
  'preserveUnused': ['pre-commit', 'commit-msg'],
};
