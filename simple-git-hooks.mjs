// @ts-check
/** @import {SGHConfig} from './packages/common/src/types/simple-git-hooks' */

/** @type {SGHConfig} */
export default /** @type {const} @satisfies {Config} */ {
  'commit-msg': 'pnpm dlx commitlint@latest --edit "$1"',
  'pre-commit': 'pnpm dlx lint-staged@latest',
  'preserveUnused': ['pre-commit', 'commit-msg'],
};
