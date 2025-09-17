import type { Linter } from 'eslint';

import { FlatConfigComposer } from 'eslint-flat-config-utils';

import type { Arrayable, Awaitable, ConfigNames, FlatConfigItem, OptionsFactory } from './types';

import { astro, command, common, ignore, javascript, typescript } from './configs';
import { perfectionist } from './configs/perfectionist';
import { hasAstro, hasTypeScript } from './env';

export async function defineConfig(
  options: OptionsFactory = {},
  ...userConfigs: Awaitable<
    Arrayable<FlatConfigItem> | Arrayable<Linter.Config> | FlatConfigComposer<any, any>
  >[]
): Promise<FlatConfigComposer<FlatConfigItem, ConfigNames>> {
  const {
    astro: enableAstro = hasAstro(),
    command: enableCommand = true,
    ignores: userIgnores = [],
    perfectionist: enablePerfectionist = true,
    typescript: enableTypeScript = hasTypeScript(),
    warnings: useOnlyWarnings = true,
  } = options;
  if (useOnlyWarnings) {
    // @ts-expect-error: types
    await import('eslint-plugin-only-warn');
  }

  const configs: Awaitable<FlatConfigItem[]>[] = [common(), javascript()];

  if (enableAstro) {
    configs.push(astro());
  }

  if (enableTypeScript) {
    configs.push(typescript());
  }

  if (enablePerfectionist) {
    configs.push(perfectionist());
  }

  if (enableCommand) {
    configs.push(command());
  }

  configs.push(ignore({ files: userIgnores }));

  const composer = new FlatConfigComposer<FlatConfigItem, ConfigNames>(
    ...configs,
    ...(userConfigs as any),
  );
  return composer;
}
