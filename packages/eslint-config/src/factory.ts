import type { Linter } from 'eslint';

import { FlatConfigComposer } from 'eslint-flat-config-utils';

import type { Arrayable, Awaitable, ConfigNames, FlatConfigItem, OptionsFactory } from './types';

import {
  astro,
  command,
  common,
  ignore,
  javascript,
  jsdoc,
  packageJSON,
  perfectionist,
  regexp,
  typescript,
  unicorn,
  vue,
} from './configs';
import { hasAstro, hasTypeScript } from './env';

export async function defineConfig(
  options: OptionsFactory = {},
  ...userConfigs: Awaitable<
    | Arrayable<FlatConfigItem>
    | Arrayable<Linter.Config>
    | FlatConfigComposer<Awaitable<Arrayable<FlatConfigItem> | Arrayable<Linter.Config>>, never>
  >[]
): Promise<FlatConfigItem[]> {
  const {
    astro: useAstro = hasAstro(),
    command: useCommand = true,
    ignores: userIgnores = [],
    jsdoc: useJSDoc = true,
    packageJSON: usePackageJSON = true,
    perfectionist: usePerfectionist = true,
    regexp: useRegexp = true,
    typescript: useTypeScript = hasTypeScript(),
    warnings: useOnlyWarnings = true,
    unicorn: useUnicorn = true,
    vue: useVue = true,
  } = options;

  if (useOnlyWarnings) {
    // @ts-expect-error: types
    await import('eslint-plugin-only-warn');
  }

  const configs: Awaitable<FlatConfigItem[]>[] = [common(), javascript()];

  if (useTypeScript) {
    configs.push(typescript());
  }

  if (useAstro) {
    configs.push(astro());
  }

  if (useVue) {
    configs.push(vue());
  }

  if (useJSDoc) {
    configs.push(jsdoc());
  }

  if (usePackageJSON) {
    configs.push(packageJSON());
  }

  if (usePerfectionist) {
    configs.push(perfectionist());
  }

  if (useRegexp) {
    configs.push(regexp());
  }

  if (useUnicorn) {
    configs.push(unicorn());
  }

  if (useCommand) {
    configs.push(command());
  }

  configs.push(ignore({ files: userIgnores }));

  const userConfigsPromises = userConfigs.map((c) => Promise.resolve(c));
  const resolvedUserConfigs = await Promise.all(userConfigsPromises);
  const normalizedUserConfigs = resolvedUserConfigs.map(async (cfg) =>
    cfg instanceof FlatConfigComposer ? await cfg.toConfigs() : cfg,
  );

  const composer = new FlatConfigComposer<FlatConfigItem, ConfigNames>(
    ...configs,
    ...normalizedUserConfigs,
  );

  return composer.toConfigs();
}
