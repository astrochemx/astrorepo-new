import type { Linter } from 'eslint';

import { type Arrayable, type Awaitable, FlatConfigComposer } from 'eslint-flat-config-utils';

import type { TSConfig } from './modules';
import type { ConfigNames, FlatConfigItem, Options } from './types';

import { astro, command, common, ignore, javascript, typescript } from './configs';
import { perfectionist } from './configs/perfectionist';
import { hasAstro, hasTypeScript } from './env';

export async function defineConfig(
  options: Options = {},
  ...userConfigs: Awaitable<
    | Arrayable<FlatConfigItem>
    | Arrayable<Linter.Config>
    | Arrayable<TSConfig[number]>
    | FlatConfigComposer<any, any>
  >[]
): Promise<FlatConfigComposer<FlatConfigItem, ConfigNames>> {
  const {
    astro: enableAstro = hasAstro(),
    command: enableCommand = true,
    ignores: userIgnores = [],
    perfectionist: enablePerfectionist = true,
    typescript: enableTypeScript = hasTypeScript(),
    warnings: onlyWarnings = true,
  } = options;
  if (onlyWarnings) {
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

  configs.push(ignore({ ignores: userIgnores }));

  const composer = new FlatConfigComposer<FlatConfigItem, ConfigNames>(
    ...configs,
    ...(userConfigs as any),
  );
  return composer;
}
