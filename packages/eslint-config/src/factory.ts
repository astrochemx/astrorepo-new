import type { Linter } from 'eslint';

import { FlatConfigComposer } from 'eslint-flat-config-utils';

import type { Arrayable, Awaitable, ConfigNames, FlatConfigItem, OptionsFactory } from './types';

import {
  astro,
  command,
  comments,
  common,
  compat,
  cspell,
  css,
  deMorgan,
  ignore,
  imports,
  javascript,
  jsdoc,
  json,
  jsonSchemaValidator,
  markdown,
  math,
  mdx,
  node,
  packageJSON,
  perfectionist,
  prettier,
  promise,
  react,
  regexp,
  security,
  toml,
  typescript,
  unicorn,
  unocss,
  unusedImports,
  vue,
  yaml,
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
    ignores: userIgnores = [],
    astro: useAstro = hasAstro(),
    command: useCommand = true,
    comments: useComments = true,
    compat: useCompat = true,
    cspell: useCSpell = true,
    css: useCSS = true,
    deMorgan: useDeMorgan = true,
    imports: useImports = true,
    jsdoc: useJSDoc = true,
    json: useJSON = true,
    jsonSchemaValidator: useJSONSchemaValidator = true,
    markdown: useMarkdown = true,
    math: useMath = true,
    mdx: useMDX = true,
    node: useNode = true,
    packageJSON: usePackageJSON = true,
    perfectionist: usePerfectionist = true,
    prettier: usePrettier = true,
    promise: usePromise = true,
    react: useReact = true,
    regexp: useRegexp = true,
    security: useSecurity = true,
    toml: useTOML = true,
    typescript: useTypeScript = hasTypeScript(),
    unicorn: useUnicorn = true,
    unocss: useUnoCSS = true,
    unusedImports: useUnusedImports = true,
    vue: useVue = true,
    warnings: useOnlyWarnings = true,
    yaml: useYAML = true,
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

  if (useReact) {
    configs.push(react());
  }

  if (useVue) {
    configs.push(vue());
  }

  if (useComments) {
    configs.push(comments());
  }

  if (useCompat) {
    configs.push(compat());
  }

  if (useCSpell) {
    configs.push(cspell());
  }

  if (useCSS) {
    configs.push(css());
  }

  if (useDeMorgan) {
    configs.push(deMorgan());
  }

  if (useImports) {
    configs.push(imports());
  }

  if (useJSDoc) {
    configs.push(jsdoc());
  }

  if (useJSON) {
    configs.push(json());
  }

  if (useJSONSchemaValidator) {
    configs.push(jsonSchemaValidator());
  }

  if (useMarkdown) {
    configs.push(markdown());
  }

  if (useMath) {
    configs.push(math());
  }

  if (useMDX) {
    configs.push(mdx());
  }

  if (useNode) {
    configs.push(node());
  }

  if (usePackageJSON) {
    configs.push(packageJSON());
  }

  if (usePerfectionist) {
    configs.push(perfectionist());
  }

  if (usePrettier) {
    configs.push(prettier());
  }

  if (usePromise) {
    configs.push(promise());
  }

  if (useRegexp) {
    configs.push(regexp());
  }

  if (useSecurity) {
    configs.push(security());
  }

  if (useTOML) {
    configs.push(toml());
  }

  if (useUnicorn) {
    configs.push(unicorn());
  }

  if (useUnoCSS) {
    configs.push(unocss());
  }

  if (useUnusedImports) {
    configs.push(unusedImports());
  }

  if (useYAML) {
    configs.push(yaml());
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
