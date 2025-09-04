import { createRequire } from 'node:module';
import type { Config } from 'stylelint';

const require = createRequire(import.meta.dirname);

export const stylelintConfig: Config = {
  allowEmptyInput: true,
  defaultSeverity: 'warning',
  extends: [
    require.resolve('stylelint-config-standard'),
    require.resolve('stylelint-config-recess-order'),
  ],
  ignoreDisables: false,
  ignoreFiles: ['node_modules'],
  ignorePatterns: '',
  plugins: [
    require.resolve('@carlosjeurissen/stylelint-csstree-validator'),
    require.resolve('@stylistic/stylelint-plugin'),
    require.resolve('stylelint-declaration-block-no-ignored-properties'),
    require.resolve('stylelint-high-performance-animation'),
    require.resolve('stylelint-no-unsupported-browser-features'),
    require.resolve('stylelint-order'),
    require.resolve('stylelint-prettier'),
  ],
  quiet: false,
  reportDescriptionlessDisables: true,
  reportInvalidScopeDisables: true,
  reportNeedlessDisables: true,
  reportUnscopedDisables: true,
  validate: process.env['CI'] !== 'true',
  // @keep-sorted
  rules: {
    '@stylistic/color-hex-case': 'lower',
    '@stylistic/named-grid-areas-alignment': true,
    '@stylistic/number-leading-zero': 'always',
    'at-rule-empty-line-before': [
      'always',
      {
        except: ['blockless-after-same-name-blockless', 'first-nested'],
        ignore: ['after-comment'],
        ignoreAtRules: ['value'],
      },
    ],
    'at-rule-no-deprecated': [
      true,
      {
        ignoreAtRules: [
          /* tailwindcss v4 */
          'custom-variant',
          'plugin',
          'source',
          'theme',
          'utility',
          'variant',
          /* tailwindcss v3 */
          'apply',
          'config',
          'layer',
          'tailwind',
          /* tailwindcss v1, v2 */
          'responsive',
          'screen',
          'variants',
          /* css modules */
          'value',
        ],
      },
    ],
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          /* tailwindcss v4 */
          'custom-variant',
          'plugin',
          'source',
          'theme',
          'utility',
          'variant',
          /* tailwindcss v3 */
          'apply',
          'config',
          'layer',
          'tailwind',
          /* tailwindcss v1, v2 */
          'responsive',
          'screen',
          'variants',
          /* css modules */
          'value',
        ],
      },
    ],
    'color-no-invalid-hex': true,
    'csstree/validator': {
      ignoreAtrules: [
        /* tailwindcss v4 */
        'custom-variant',
        'plugin',
        'source',
        'theme',
        'utility',
        'variant',
        /* tailwindcss v3 */
        'apply',
        'config',
        'layer',
        'tailwind',
        /* tailwindcss v1, v2 */
        'responsive',
        'screen',
        'variants',
        /* css modules */
        'value',
      ],
      ignoreProperties: ['/.+/', 'text-wrap'],
      syntaxExtensions: ['less', 'sass'],
    },
    'function-no-unknown': [
      true,
      {
        ignoreFunctions: ['theme'],
      },
    ],
    'import-notation': null,
    'plugin/declaration-block-no-ignored-properties': true,
    'plugin/no-low-performance-animation-properties': true,
    'plugin/no-unsupported-browser-features': [
      true,
      {
        browsers: ['last 2 chrome version', 'last 2 firefox version', 'last 2 safari version'],
        ignorePartialSupport: true,
        severity: 'warning',
      },
    ],
    'prettier/prettier': true,
    'property-no-unknown': [
      true,
      {
        ignoreProperties: ['composes', 'compose-with'],
        ignoreSelectors: [':export', /^:import/],
      },
    ],
    'selector-max-id': null,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['export', 'import', 'global', 'local', 'external'],
      },
    ],
    'selector-type-no-unknown': [
      true,
      {
        ignore: ['custom-elements'],
        ignoreTypes: ['from'],
      },
    ],
  },
  overrides: [
    {
      files: ['**/*.cjs', '**/*.cjsx', '**/*.js', '**/*.jsx', '**/*.mjs', '**/*.mjsx'],
      // customSyntax: 'postcss-lit',
      customSyntax: require.resolve('postcss-styled-syntax'),
    },
    {
      files: ['**/*.cts', '**/*.ctsx', '**/*.mts', '**/*.mtsx', '**/*.ts', '**/*.tsx'],
      // customSyntax: 'postcss-lit',
      customSyntax: require.resolve('postcss-styled-syntax'),
    },
    {
      files: ['**/*.astro'],
      customSyntax: require.resolve('postcss-html'),
    },
    {
      files: [
        '**/*.asp',
        '**/*.aspx',
        '**/*.ejs',
        '**/*.htm',
        '**/*.html',
        '**/*.jshtm',
        '**/*.jsp',
        '**/*.mdoc',
        '**/*.rhtml',
        '**/*.shtml',
        '**/*.volt',
        '**/*.xht',
        '**/*.xhtml',
      ],
      customSyntax: require.resolve('postcss-html'),
    },
    {
      files: ['**/*.md'],
      customSyntax: require.resolve('postcss-markdown'),
    },
    {
      files: ['**/*.ctp', '**/*.php', '**/*.php4', '**/*.php5', '**/*.phtml'],
      customSyntax: require.resolve('postcss-html'),
    },
    {
      files: ['**/*.less'],
      customSyntax: require.resolve('postcss-less'),
      plugins: [require.resolve('stylelint-less')],
      rules: {
        'at-rule-no-unknown': null,
        'less/color-hex-case': 'lower',
        'less/color-no-invalid-hex': true,
        'less/no-duplicate-variables': true,
      },
    },
    {
      files: ['**/*.scss'],
      customSyntax: require.resolve('postcss-scss'),
      extends: [
        require.resolve('stylelint-config-standard-scss'),
        require.resolve('stylelint-config-sass-guidelines'),
      ],
      plugins: [require.resolve('stylelint-scss')],
      rules: {
        'at-rule-empty-line-before': [
          'always',
          {
            except: ['blockless-after-blockless', 'first-nested'],
            ignore: ['after-comment'],
            ignoreAtRules: ['else', 'value'],
          },
        ],
        'at-rule-no-unknown': null,
        'scss/at-rule-no-unknown': [
          true,
          {
            ignoreAtRules: [
              /* tailwindcss v4 */
              'custom-variant',
              'plugin',
              'source',
              'theme',
              'utility',
              'variant',
              /* tailwindcss v3 */
              'apply',
              'config',
              'layer',
              'tailwind',
              /* tailwindcss v1, v2 */
              'responsive',
              'screen',
              'variants',
              /* css modules */
              'value',
            ],
          },
        ],
        'scss/function-no-unknown': [
          true,
          {
            ignoreFunctions: ['theme'],
          },
        ],
      },
    },
    {
      files: ['**/*.styl', '**/*.stylus'],
      customSyntax: require.resolve('postcss-styl'),
    },
    {
      files: ['**/*.svelte'],
      customSyntax: require.resolve('postcss-html'),
    },
    {
      files: ['**/*.vue'],
      customSyntax: require.resolve('postcss-html'),
      extends: [
        // require.resolve('stylelint-config-recommended-vue'),
        require.resolve('stylelint-config-standard-scss'),
        require.resolve('stylelint-config-recommended-vue/scss'),
      ],
      rules: {
        'value-keyword-case': [
          'lower',
          {
            ignoreFunctions: ['v-bind'],
          },
        ],
      },
    },
    {
      files: [
        '**/*.ascx',
        '**/*.atom',
        '**/*.axaml',
        '**/*.axml',
        '**/*.bpmn',
        '**/*.cpt',
        '**/*.csl',
        '**/*.csproj.user',
        '**/*.csproj',
        '**/*.dita',
        '**/*.ditamap',
        '**/*.dtd',
        '**/*.dtml',
        '**/*.ent',
        '**/*.fsproj',
        '**/*.fxml',
        '**/*.iml',
        '**/*.isml',
        '**/*.jmx',
        '**/*.launch',
        '**/*.menu',
        '**/*.mod',
        '**/*.mxml',
        '**/*.nuspec',
        '**/*.opml',
        '**/*.owl',
        '**/*.proj',
        '**/*.props',
        '**/*.pt',
        '**/*.publishsettings',
        '**/*.pubxml.user',
        '**/*.pubxml',
        '**/*.rbxlx',
        '**/*.rbxmx',
        '**/*.rdf',
        '**/*.rng',
        '**/*.rss',
        '**/*.shproj',
        '**/*.storyboard',
        '**/*.svg',
        '**/*.targets',
        '**/*.tld',
        '**/*.tmx',
        '**/*.vbproj.user',
        '**/*.vbproj',
        '**/*.vcxproj.filters',
        '**/*.vcxproj',
        '**/*.wsdl',
        '**/*.wxi',
        '**/*.wxl',
        '**/*.wxs',
        '**/*.xaml',
        '**/*.xbl',
        '**/*.xib',
        '**/*.xlf',
        '**/*.xliff',
        '**/*.xml',
        '**/*.xoml',
        '**/*.xpdl',
        '**/*.xsd',
        '**/*.xsl',
        '**/*.xslt',
        '**/*.xul',
      ],
      customSyntax: require.resolve('postcss-html'),
    },
  ],
} as const satisfies Config;
