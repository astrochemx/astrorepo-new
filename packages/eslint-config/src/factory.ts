/** biome-ignore-all lint/suspicious/noExplicitAny: noExplicitAny */

import type { Linter } from 'eslint';
import { type Arrayable, type Awaitable, FlatConfigComposer } from 'eslint-flat-config-utils';
import { astro, command, common, ignore, javascript, typescript } from './configs';
import { hasAstro, hasTypeScript } from './env';
import type { TSConfig } from './modules';
import type { ConfigNames, FlatConfigItem, Options } from './types';

export function defineConfig(
  options: Options = {},
  ...userConfigs: Awaitable<
    | Arrayable<FlatConfigItem>
    | Arrayable<Linter.Config>
    | Arrayable<TSConfig[number]>
    | FlatConfigComposer<any, any>
  >[]
): FlatConfigComposer<FlatConfigItem, ConfigNames> {
  const {
    astro: enableAstro = hasAstro(),
    command: enableCommand = true,
    ignores: userIgnores = [],
    typescript: enableTypeScript = hasTypeScript(),
  } = options;
  const configs: Awaitable<FlatConfigItem[]>[] = [common(), javascript()];

  if (enableAstro) {
    configs.push(astro());
  }

  if (enableTypeScript) {
    configs.push(typescript());
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
