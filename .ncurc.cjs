// @ts-check
/** @import {NCUConfig} from './packages/common/src/types/npm-check-updates' */

// @keep-sorted
/** @type {NCUConfig} */
const npmCheckUpdatesConfig = {
  cacheClear: true,
  concurrency: 24,
  // deep: true,
  dep: ['dev', 'optional', 'packageManager', 'peer', 'prod'],
  format: ['group', 'ownerChanged', 'repo', 'time', 'installedVersion'],
  global: false,
  install: 'prompt',
  packageManager: 'pnpm',
  peer: false,
  pre: 1,
  root: true,
  target: 'latest',
  upgrade: false,
  workspaces: true,
};

/** @type {NCUConfig} } */
module.exports = npmCheckUpdatesConfig;
