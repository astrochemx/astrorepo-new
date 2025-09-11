import { createRequire } from 'node:module';
import type { Config } from 'prettier';
import * as mdxCustom from './parsers/mdx-custom.ts';

const sortImports = false;
const sortTypesFirst = false;
const jtsMultilineArrays = false;

const require = createRequire(import.meta.dirname);

const importOrderPluginOptions = {
  importOrder: [
    '',
    '(client-only|server-only)',
    '(@abraham/reflection|reflect-metadata)',
    '',
    ...(sortTypesFirst ? ['<TYPES>^(node:)', '<TYPES>', '<TYPES>^[.]'] : []),
    '<BUILTIN_MODULES>',
    '<THIRD_PARTY_MODULES>',
    '^(?!.*[.](c|le|pc|postc|sa|sc)ss$)[./].*$',
    '',
    '^.*[.](c|le|pc|postc|sa|sc|)ss$',
  ],
  importOrderCaseSensitive: false,
  importOrderParserPlugins: ['typescript', 'jsx'],
  importOrderSafeSideEffects: ['^.*$'],
  importOrderTypeScriptVersion: '5.9.2',
};

// @ts-expect-error: types
export const prettierConfig: Config = {
  arrowParens: 'always',
  bracketSameLine: false,
  bracketSpacing: true,
  checkIgnorePragma: false,
  embeddedLanguageFormatting: 'auto',
  endOfLine: 'lf',
  experimentalOperatorPosition: 'end',
  experimentalTernaries: false,
  htmlWhitespaceSensitivity: 'css',
  insertPragma: false,
  jsxSingleQuote: false,
  objectWrap: 'preserve',
  printWidth: 100,
  proseWrap: 'preserve',
  quoteProps: 'consistent',
  requirePragma: false,
  semi: true,
  singleAttributePerLine: false,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  useTabs: false,
  vueIndentScriptAndStyle: true,

  /**
   * We can use one of the following methods to avoid problems like `[error]
   * Cannot find package '@prettier/plugin-xml'` imported from
   * <.../project/noop.js>`:
   *
   * ```typescript
   * import { createRequire } from 'node:module'; // 1-2
   * import type { Config } from 'prettier';
   *
   * const require = createRequire(import.meta.dirname); // 1-2
   * const config: Config = {
   *   plugins: [
   *     require.resolve('@prettier/plugin-xml'), // 1, this method works with VSCode Prettier (CJS)
   *     require('@prettier/plugin-xml'), // 2
   *     import.meta.resolve('@prettier/plugin-xml'), // 3
   *     await import('@prettier/plugin-xml'), // 4
   *   ],
   * };
   * ```
   */
  plugins: [
    require.resolve('@prettier/plugin-xml'),
    require.resolve('prettier-plugin-astro'),
    require.resolve('prettier-plugin-ini'),
    require.resolve('prettier-plugin-sh'),
    require.resolve('prettier-plugin-sql'),
    require.resolve('prettier-plugin-svelte'),
    ...(jtsMultilineArrays ? [require.resolve('prettier-plugin-multiline-arrays')] : []),
    ...(sortImports ? [require.resolve('@ianvs/prettier-plugin-sort-imports')] : []),
    require.resolve('prettier-plugin-jsdoc'),
    require.resolve('prettier-plugin-tailwindcss'),
  ],

  overrides: [
    {
      files: [
        '**/*.astro',
        '**/*.cjs',
        '**/*.cjsx',
        '**/*.cts',
        '**/*.ctsx',
        '**/*.js',
        '**/*.jsx',
        '**/*.mjs',
        '**/*.mjsx',
        '**/*.mts',
        '**/*.mtsx',
        '**/*.svelte',
        '**/*.ts',
        '**/*.tsx',
        '**/*.vue',
      ],
      options: {
        ...(sortImports ? importOrderPluginOptions : {}),
        jsdocAddDefaultToDescription: true,
        jsdocCapitalizeDescription: false,
        jsdocKeepUnParseAbleExampleIndent: true,
        jsdocPreferCodeFences: true,
        jsdocPrintWidth: 80,
        jsdocSeparateReturnsFromParam: false,
        jsdocSeparateTagGroups: false,
        jsdocVerticalAlignment: false,
        tailwindFunctions: [
          'cc',
          'classList',
          'classNames',
          'clb',
          'clsx',
          'cn',
          'cnb',
          'ctl',
          'cva',
          'cx',
          'dcnb',
          'objstr',
          'tv',
          'tw.color',
          'tw.style',
          'tw',
          'twc',
          'twJoin',
          'twMerge',
        ],
      },
    },
    {
      files: ['**/*.json', '**/*.json5', '**/*.jsonc'],
      excludeFiles: [
        '**/package.json',
        '**/package-lock.json',
        '**/user-data/User/**/*.json',
        '**/.vscode/**/*.json',
        '**/*.code-snippets',
        '**/extensions*.json',
        '**/keybindings*.json',
        '**/launch*.json',
        '**/settings*.json',
        '**/tasks*.json',
      ],
      options: {
        plugins: [],
        trailingComma: 'none',
      },
    },
    {
      files: ['**/package.json'],
      options: {
        plugins: [require.resolve('prettier-plugin-packagejson')],
        trailingComma: 'none',
      },
    },
    {
      files: [
        '**/.vscode/**/*.json',
        '**/*.code-snippets',
        '**/extensions*.json',
        '**/keybindings*.json',
        '**/launch*.json',
        '**/settings*.json',
        '**/tasks*.json',
        '**/user-data/User/**/*.json',
      ],
      options: {
        multilineArraysWrapThreshold: 0,
        plugins: [require.resolve('prettier-plugin-multiline-arrays')],
      },
    },
    {
      files: ['**/*.toml'],
      options: {
        plugins: [require.resolve('prettier-plugin-toml')],
        trailingComma: 'none',
      },
    },
    {
      files: ['**/pages/**/*.md', '**/slides.md'],
      options: {
        parser: 'slidev',
        plugins: [
          require.resolve('prettier-plugin-slidev'),
          require.resolve('prettier-plugin-tailwindcss'),
        ],
      },
    },
    {
      files: ['**/*.mdx'],
      options: {
        parser: 'mdx-custom',
        // @ts-expect-error: types
        plugins: [mdxCustom],
      },
    },
    {
      files: [
        '*.buckconfig',
        '*.cfg',
        '*.cnf',
        '*.coveragerc',
        '*.dof',
        '*.editorconfig',
        '*.flake8',
        '*.frm',
        '*.gitconfig',
        '*.gitmodules',
        '*.ini',
        '*.lektorproject',
        '*.mc',
        '*.npmrc',
        '*.prefs',
        '*.pro',
        '*.properties',
        '*.pylintrc',
        '*.reg',
        '*.sfv',
        '*.shellcheckrc',
        '*.url',
        'buildozer.spec',
        'hosts',
        'HOSTS',
        'pylintrc',
        'vlcrc',
      ],
      options: {
        iniSpaceAroundEquals: true,
        plugins: [require.resolve('prettier-plugin-ini'), require.resolve('prettier-plugin-sh')],
      },
    },
    {
      files: [
        '**/*.nginx',
        '**/*.nginxconf',
        '**/default.conf',
        '**/fastcgi.conf',
        '**/mime.types',
        '**/nginx.*',
        '**/nginx.conf',
        '**/nginx/**/*',
        '**/proxy.conf',
      ],
      options: {
        parser: 'nginx',
        plugins: [require.resolve('prettier-plugin-nginx')],
      },
    },
  ],
} as const satisfies Config;
