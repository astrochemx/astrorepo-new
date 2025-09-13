// @ts-check
/** @import {Config, HookContext, HooksRecord, Pkg, PnpmSettings, ReadPackageHook, UpdateConfigHook} from './packages/common/src/types/pnpm' */

const { readFileSync } = require('node:fs');
const path = require('node:path');
const process = require('node:process');
const { pathToFileURL } = require('node:url');
const yaml = require('yaml');

/**
 * Caution! Adds old and deprecated type definitions, that are no longer needed!
 *
 * @type {ReadPackageHook}
 * @see [@pnpm/plugin-types-fixer](https://github.com/pnpm/plugin-types-fixer)
 */
// @ts-expect-error: unused
function _addTypes(pkg) {
  for (const [devDepName, devDepRange] of Object.entries(pkg.devDependencies ?? {})) {
    if (
      devDepName.startsWith('@types/') &&
      !pkg.dependencies?.[devDepName] &&
      !pkg.peerDependencies?.[devDepName]
    ) {
      const pkgName = devDepName.substring('@types/'.length);
      if (pkg.dependencies?.[pkgName]) {
        pkg.dependencies[devDepName] = devDepRange;
      } else if (pkg.peerDependencies?.[pkgName]) {
        pkg.peerDependencies[devDepName] = '*';
      }
    }
  }
  return pkg;
}

/** @type {Record<string, string[]>} */
const bannedDeps = /** @type {const} @satisfies {Record<string, string[]>} */ {
  '@pkgr/core': ['0.2.8'],
  'eslint-config-prettier': ['8.10.1', '9.1.1', '10.1.6', '10.1.7'],
  'eslint-plugin-prettier': ['4.2.2', '4.2.3'],
  'is': ['3.3.1'],
  'napi-postinstall': ['0.3.1'],
  'synckit': ['0.11.9'],
};

/** @type {ReadPackageHook} */
function banDeps(pkg) {
  if (!pkg.name || !pkg.version) {
    return pkg;
  }
  if (Object.keys(bannedDeps).includes(pkg.name) && bannedDeps[pkg.name]?.includes(pkg.version)) {
    const key = `${pkg.name}@${pkg.version}`;
    throw new Error(`❌ '${key}' is banned in this project!`);
  }
  return pkg;
}

/** @type {() => PnpmSettings['overrides']} */
function getOverrides() {
  try {
    const filePath = path.resolve('./pnpm-workspace.yaml');
    const fileContent = readFileSync(filePath, { encoding: 'utf8' });
    /** @type {PnpmSettings} */
    const pnpmWorkspaceYaml = yaml.parse(fileContent);
    return pnpmWorkspaceYaml.overrides;
  } catch (error) {
    if (
      typeof error === 'object' &&
      error !== null &&
      'message' in error &&
      typeof error.message === 'string'
    ) {
      console.error(error.message);
    }
    return {};
  }
}

/** @type {PnpmSettings['overrides']} */
const overrides = getOverrides();

/** @type {ReadPackageHook} */
function overridePeerDependencies(pkg) {
  if (pkg.peerDependencies && overrides) {
    for (const dep in pkg.peerDependencies) {
      if (overrides[dep]) {
        pkg.peerDependencies[dep] = overrides[dep];
      }
    }
  }
  return pkg;
}

/**
 * @type {(pkg: Pkg, context?: HookContext) => Promise<Pkg>}
 * @see [hooks.readPackage(pkg, context): pkg | Promise<pkg>](https://pnpm.io/pnpmfile#hooksreadpackagepkg-context-pkg--promisepkg)
 */
async function readPackage(pkg) {
  return await banDeps(await overridePeerDependencies(pkg));
}

/** @type {Partial<Config>} */
const newSettings = {
  autoInstallPeers: true,
  dedupeDirectDeps: false,
  dedupePeerDependents: true,
  enableGlobalVirtualStore: false,
  enablePrePostScripts: false,
  hoist: true,
  hoistWorkspacePackages: true,
  ignorePatchFailures: false,
  optimisticRepeatInstall: false,
  resolutionMode: 'highest',
  saveWorkspaceProtocol: 'rolling',
  shamefullyHoist: false,
  sharedWorkspaceLockfile: true,
  shellEmulator: true,
  sideEffectsCache: false,
  strictPeerDependencies: false,
  verifyDepsBeforeRun: 'warn',
};

/**
 * @type {UpdateConfigHook}
 * @see [@pnpm/plugin-better-defaults](https://github.com/pnpm/plugin-better-defaults)
 */
// @ts-expect-error: unused
function _setSettings(cfg) {
  Object.assign(cfg, newSettings);
  if (cfg.hoistPattern?.length === 1 && cfg.hoistPattern[0] === '*') {
    cfg.hoistPattern = [];
  }
  if (cfg.publicHoistPattern?.length === 1 && cfg.publicHoistPattern[0] === '*') {
    cfg.publicHoistPattern = [];
  }
  return cfg;
}

/**
 * @type {UpdateConfigHook}
 * @see [@pnpm/plugin-trusted-deps](https://github.com/pnpm/plugin-trusted-deps)
 */
// @ts-expect-error: unused
function _setTrustedDeps(cfg) {
  cfg.onlyBuiltDependencies ??= [];
  cfg.onlyBuiltDependencies.push(/* ...require('./allowBuiltDependencies.json') */);
  return cfg;
}

/**
 * @type {UpdateConfigHook}
 * @see [@pnpm/plugin-esm-node-path](https://github.com/pnpm/plugin-esm-node-path)
 */
function loadESM(cfg) {
  // Resolve paths and convert to proper file URLs
  const loaderPath = path.resolve(__dirname, 'scripts/esm-loader.mjs');
  const loaderUrl = pathToFileURL(loaderPath).href;
  const baseUrl = pathToFileURL(path.resolve('./')).href;

  // Build the registration code
  const registrationCode = `import{register}from'node:module';register('${loaderUrl}','${baseUrl}');`;

  // Create NODE_OPTIONS with properly encoded data URL
  const importFlag = `--import=data:text/javascript,${encodeURIComponent(registrationCode)}`;
  cfg.extraEnv['NODE_OPTIONS'] =
    `${process.env['NODE_OPTIONS'] ? `${process.env['NODE_OPTIONS']} ` : ''}${importFlag}`;
  return cfg;
}

/**
 * @type {UpdateConfigHook}
 * @see [hooks.updateConfig(config): config | Promise<config>](https://pnpm.io/pnpmfile#hooksupdateconfigconfig-config--promiseconfig)
 */
function updateConfig(cfg) {
  return loadESM(cfg);
}

/**
 * @type {HooksRecord}
 * @see [Hooks](https://pnpm.io/pnpmfile#hooks)
 */
module.exports = /** @type {const} @satisfies {HooksRecord} */ {
  hooks: {
    readPackage,
    updateConfig,
  },
};
