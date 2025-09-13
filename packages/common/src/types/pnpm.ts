import type { Config } from '@pnpm/config';
import type { Log } from '@pnpm/core-loggers';
import type { CustomFetchers } from '@pnpm/fetcher-base';
import type { PreResolutionHookContext } from '@pnpm/hooks.types';
import type { LockfileObject } from '@pnpm/lockfile.types';
import type { HookContext } from '@pnpm/pnpmfile';
import type { ImportIndexedPackageAsync } from '@pnpm/store-controller-types';
import type { BaseManifest, PnpmSettings, ProjectManifest } from '@pnpm/types';

export type * from '@pnpm/patching.types';

type Pkg = BaseManifest;

type AfterAllResolvedHook = (
  lockfile: LockfileObject,
  context?: HookContext,
) => LockfileObject | Promise<LockfileObject>;
type FetchersHook = CustomFetchers;
type FilterLogHook = (log: Log) => boolean;
type ImportPackageHook = ImportIndexedPackageAsync;
type PreResolutionHook = (ctx: PreResolutionHookContext) => Promise<void>;
type ReadPackageHook = (pkg: Pkg, context?: HookContext) => Pkg | Promise<Pkg>;
type UpdateConfigHook = (config: Config) => Config | Promise<Config>;

interface Hooks {
  afterAllResolved?: AfterAllResolvedHook;
  fetchers?: FetchersHook;
  filterLog?: FilterLogHook;
  importPackage?: ImportPackageHook;
  preResolution?: PreResolutionHook;
  readPackage?: ReadPackageHook;
  updateConfig?: UpdateConfigHook;
}

type HooksRecord = Record<'hooks', Hooks>;

export type {
  AfterAllResolvedHook,
  BaseManifest,
  Config,
  CustomFetchers,
  FetchersHook,
  FilterLogHook,
  HookContext,
  Hooks,
  HooksRecord,
  ImportIndexedPackageAsync,
  ImportPackageHook,
  LockfileObject,
  Log,
  Pkg,
  PnpmSettings,
  PreResolutionHook,
  PreResolutionHookContext,
  ProjectManifest,
  ReadPackageHook,
  UpdateConfigHook,
};
