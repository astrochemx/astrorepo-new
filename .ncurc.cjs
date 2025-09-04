// @ts-check
/** @import {NCUConfig, NCUTargetFunction} from './packages/common/src/types/npm-check-updates' */

/** @type {NCUTargetFunction} */
const targetFunction = (packageName, _versionRange) => {
  if (packageName === 'eslint-plugin-react-hooks') {
    return '@rc';
  }
  return 'latest';
};

// @keep-sorted
/** @type {NCUConfig} */
const npmCheckUpdatesConfig = {
  cacheClear: true,
  concurrency: 24,
  deep: true,
  dep: ['dev', 'optional', 'packageManager', 'peer', 'prod'],
  format: ['group', 'ownerChanged', 'repo', 'time', 'installedVersion'],
  global: false,
  install: 'prompt',
  packageManager: 'pnpm',
  peer: false,
  pre: 1,
  target: targetFunction,
  upgrade: true,
};

/** @type {NCUConfig} } */
module.exports = npmCheckUpdatesConfig;
