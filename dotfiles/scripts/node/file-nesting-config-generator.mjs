// @ts-check
/** biome-ignore-all lint/suspicious/noTemplateCurlyInString: noTemplateCurly */

/**
 * Thanks to Anthony Fu - https://github.com/antfu/vscode-file-nesting-config/
 *
 * '//' is inserted into arrays to prevent them from being collapsed by prettier
 * and other formatters for better changes handling in git.
 */

import * as fs from 'node:fs';

/*
  --------------------
    CONSTANTS
  --------------------
*/

const today = [...new Date().toISOString().slice(0, 16).replace('T', ' '), ' UTC'].join('');

/*
  --------------------
    HELPER FUNCTIONS
  --------------------
*/

/**
 * Add `lowercase` variants of key/values to an array.
 *
 * @param {string[]} arr
 */
function addLowerCaseVariants(arr) {
  const lowerCaseArr = arr.map((elm) => elm.toLowerCase());
  return [...arr, ...lowerCaseArr];
}

/**
 * Add `Title Case` variants of key/values to an array.
 *
 * @param {string[]} arr
 */
function addTitleCaseVariants(arr) {
  const upperCaseArr = arr.map((elm) => toTitleCase(elm));
  return [...arr, ...upperCaseArr];
}

/** @param {{ [x: string]: string | string[] }} obj */
function sortObject(
  obj,
  fn = (/** @type {string} */ a, /** @type {string} */ b) => a.localeCompare(b),
) {
  return (
    Object.keys(obj)
      .toSorted(fn)
      // eslint-disable-next-line unicorn/no-array-reduce
      .reduce((/** @type {{ [key: string] }} */ acc, key) => {
        acc[key] = obj[key];
        return acc;
      }, {})
  );
}

/** @param {Iterable<any>} items */
function stringify(items) {
  return [...new Set(items)]
    .toSorted()
    .filter((item) => item && item !== '')
    .join(', ');
}

/**
 * Convert string to `Title Case`.
 *
 * @param {string} str
 */
function toTitleCase(str) {
  return str
    .toLowerCase()
    .replaceAll(
      /(^|[-_])(\w)/g,
      (/** @type {string} */ _, /** @type {string} */ a, /** @type {string} */ b) =>
        `${a}${b.toUpperCase()}`,
    );
}

/*
  --------------------
    COMMON
  --------------------
*/

// @keep-sorted
const agents = [
  '.clinerules',
  '.cursorrules',
  '.replit.md',
  '.windsurfrules',
  'AGENT.md',
  'CLAUDE.md',
  'GEMINI.md',
];

// @keep-sorted
const buildTools = [
  //
  'build.config.*',
  'electron-builder.*',
  'grunt*',
  'gulp*',
  'rolldown.config.*',
  'rollup.config.*',
  'rspack*',
  'tsdown.config.*',
  'tsup.config.*',
  'webpack*',
];

// @keep-sorted
const dependencyAnalysis = [
  //
  '.knip.*',
  'knip.*',
];

// @keep-sorted
const linters = [
  //
  '.biome.json*',
  '.commitlint*',
  '.cspell.*',
  '.cSpell.*',
  '.dlint.json',
  '.dprint.json*',
  '.editorconfig',
  '.eslint*',
  '.flowconfig',
  '.hintrc*',
  '.htmlhintrc*',
  '.jslint*',
  '.lintstagedrc*',
  '.ls-lint.*',
  '.markdownlint*',
  '.nano-staged*',
  '.nanostagedrc*',
  '.oxlint.json*.bak',
  '.oxlint.json*',
  '.oxlintrc.json*.bak',
  '.oxlintrc.json*',
  '.prettier*',
  '.pylintrc',
  '.ruff.toml',
  '.shellcheck*',
  '.stylelint*',
  '.textlint*',
  '.xo-config*',
  '.yamllint*',
  'alejandra.toml',
  'biome.json*',
  'commitlint*',
  'cspell.*',
  'cSpell.*',
  'cspell*.txt',
  'dangerfile*',
  'dlint.json',
  'dprint.json*',
  'eslint*',
  'import-sorter*',
  'lint-staged*',
  'ls-lint.*',
  'nano-staged*',
  'oxlint.json*.bak',
  'oxlint.json*',
  'oxlintrc.json*.bak',
  'oxlintrc.json*',
  'phpcs.xml',
  'prettier*',
  'pylintrc',
  'pyrightconfig.json',
  'ruff.toml',
  'shellcheck*',
  'spell.txt',
  'spelling.txt',
  'stylelint*',
  'tslint*',
  'words.txt',
  'xo.config.*',
];

// @keep-sorted
const mise = [
  '.go-version',
  '.go-versions',
  '.node-version',
  '.node-versions',
  '.nvmrc',
  '.python-version',
  '.python-versions',
  '.tool-version',
  '.tool-versions',
];

// @keep-sorted
const services = [
  //
  '.circleci*',
  '.cursor*',
  '.firebase*',
  '.github*',
  '.gitlab*',
  '.gitpod*',
  '.sentry*',
  '.stackblitz*',
  '.styleci*',
  '.travis*',
  '.vsls.json',
  '.windsurf*',
  'appveyor*',
  'azure-pipelines*',
  'colada.options.ts',
  'crowdin*',
  'jenkins*',
  'netlify*',
  'nixpacks*',
  'Procfile',
  'pullapprove*',
  'release-tasks.sh',
  'renovate*',
  'sentry.*.config.ts',
  'sonar-project.properties',
  'unlighthouse*',
  'vercel*',
  'wrangler.*',
];

// @keep-sorted
const syntaxHighlighting = [
  //
  'ec.config.*',
];

// @keep-sorted
const testingTools = [
  //
  '.codecov',
  '.lighthouserc.*',
  '.mocha*',
  '.puppeteerrc*',
  'ava.config.*',
  'cypress.*',
  'histoire.config.*',
  'jasmine.*',
  'jest.config.*',
  'karma*',
  'lighthouserc.*',
  'playwright.config.*',
  'puppeteer.config.*',
  'vitest.config.*',
];

// @keep-sorted
const tsconfigJSON = [
  //
  'api-extractor.json',
  'jsconfig.*.json',
  'jsconfig.json',
  'jsconfig*.json',
  'tsconfig.*.json',
  'tsconfig*.json',
  'tsdoc.*.json',
  'tsdoc.json',
  'tsdoc*.json',
];

// @keep-sorted
const workspaces = [
  //
  '.all-contributors*',
  '.allcontributors*',
  '.gitmojirc.json',
  '.huskyrc*',
  '.npm*',
  '.pnp.*',
  '.pnpm*',
  '.release-it.*',
  '.release-please*.json',
  '.releaserc*',
  '.simple-git-hooks*',
  '.tazerc*',
  '.yarnrc*',
  '*.code-workspace',
  'bower.json',
  'bun.lock',
  'bun.lockb',
  'bunfig.toml',
  'firebase.json',
  'lerna*',
  'npm-shrinkwrap.json',
  'nx.*',
  'package-lock.json',
  'package.*.json',
  'package.nls*.json',
  'pnpm-workspace.*',
  'pnpm*',
  'release-please*.json',
  'release.config.*',
  'simple-git-hooks*',
  'taze.config.*',
  'turbo*',
  'workspace.json',
  'yarn*',
  ...mise,
];

/*
  --------------------
    SPECIAL
  --------------------
*/

// @keep-sorted
const ansibleCFG = [
  //
  '.ansible-lint',
  'ansible.cfg',
  'requirements.yml',
];

// @keep-sorted
const applicationPROPERTIES = [
  //
  '*.properties',
];

// @keep-sorted
const appTSX = [
  //
  'entry-client.tsx',
  'entry-server.tsx',
];

// @keep-sorted
const asaxFiles = [
  //
  '$(capture).*.cs',
  '$(capture).*.vb',
];

// @keep-sorted
const ascxFiles = [
  //
  '$(capture).*.cs',
  '$(capture).*.vb',
];

// @keep-sorted
const ashxFiles = [
  //
  '$(capture).*.cs',
  '$(capture).*.vb',
];

// @keep-sorted
const aspxFiles = [
  //
  '$(capture).*.cs',
  '$(capture).*.vb',
];

// @keep-sorted
const axamlFiles = [
  //
  '$(capture).axaml.cs',
];

// @keep-sorted
const blocDARTFiles = [
  //
  '$(capture).event.dart',
  '$(capture).state.dart',
];

// @keep-sorted
const buildBAZEL = [
  //
  '.bazelignore',
  '.bazelproject',
  '.bazelversion',
  '*.bazel',
  '*.bazelrc',
  '*.bzl',
  'bazel.rc',
  'MODULE.bazel.lock',
  'WORKSPACE',
];

// @keep-sorted
const buildWrapperLOG = [
  //
  'build-wrapper-dump*.json',
  'build-wrapper-linux*',
  'build-wrapper-macosx*',
  'build-wrapper-win*.exe',
  'build-wrapper*.log',
];

// @keep-sorted
const cargoTOML = [
  //
  '.clippy.toml',
  '.rustfmt.toml',
  'Cargo.Bazel.lock',
  'Cargo.lock',
  'clippy.toml',
  'cross.toml',
  'insta.yaml',
  'rust-toolchain.toml',
  'rustfmt.toml',
];

// @keep-sorted
const ccFiles = [
  //
  '$(capture).h',
  '$(capture).hh',
  '$(capture).hpp',
  '$(capture).hxx',
];

// @keep-sorted
const cFiles = [
  //
  '$(capture).h',
];

// @keep-sorted
const cjsFiles = [
  //
  '$(capture)_*.cjs',
  '$(capture).*.cjs',
  '$(capture).cjs.LICENSE*',
  '$(capture).cjs.map',
  '$(capture).d.cts.map',
  '$(capture).d.cts',
  '$(capture).d.ts.map',
  '$(capture).d.ts',
  '$(capture).js.LICENSE*',
  '$(capture).js.map',
  '$(capture).js',
];

// @keep-sorted
const cMakeListsTXT = [
  //
  '.cmake-format.yaml',
  '*.cmake.in',
  '*.cmake',
  'CMakeCache.txt',
  'CMakePresets.json',
];

// @keep-sorted
const componentTSFiles = [
  //
  '$(capture).component.css',
  '$(capture).component.html',
  '$(capture).component.less',
  '$(capture).component.sass',
  '$(capture).component.scss',
  '$(capture).component.spec.ts',
];

// @keep-sorted
const composerJSON = [
  //
  '.php*.cache',
  'composer.lock',
  'phpunit.xml*',
  'psalm*.xml',
];

// @keep-sorted
const cppFiles = [
  //
  '$(capture).h',
  '$(capture).hh',
  '$(capture).hpp',
  '$(capture).hxx',
];

// @keep-sorted
const csFiles = [
  //
  '$(capture).*.cs.uid',
  '$(capture).*.cs',
  '$(capture).cs.uid',
];

// @keep-sorted
const cshtmlFiles = [
  //
  '$(capture).cshtml.cs',
  '$(capture).cshtml.css',
];

// @keep-sorted
const cssFiles = [
  //
  '$(capture).*.css',
  '$(capture).css.map',
];

// @keep-sorted
const ctsFiles = [
  //
  '$(capture)_*.cts',
  '$(capture).*.cts',
  '$(capture).cjs.LICENSE*',
  '$(capture).cjs.map',
  '$(capture).cjs',
  '$(capture).cts.LICENSE*',
  '$(capture).cts.map',
  '$(capture).d.cts.map',
  '$(capture).d.cts',
  '$(capture).d.ts.map',
  '$(capture).d.ts',
  '$(capture).js.LICENSE*',
  '$(capture).js.map',
  '$(capture).js',
  '$(capture).ts.LICENSE*',
  '$(capture).ts.map',
  '$(capture).ts',
];

// @keep-sorted
const cxxFiles = [
  //
  '$(capture).h',
  '$(capture).hh',
  '$(capture).hpp',
  '$(capture).hxx',
];

// @keep-sorted
const dartFiles = [
  //
  '$(capture).freezed.dart',
  '$(capture).g.dart',
  '$(capture).mapper.dart',
];

// @keep-sorted
const db3Files = [
  //
  '*.db3-shm',
  '*.db3-wal',
  '${capture}.${extname}-*',
];

// @keep-sorted
const dbFiles = [
  //
  '*.db-shm',
  '*.db-wal',
  '${capture}.${extname}-*',
];

// @keep-sorted
const defaultNIX = [
  //
  'shell.nix',
];

// @keep-sorted
const dockerfile = [
  //
  '.devcontainer.*',
  '.dockerignore',
  '*.dockerfile',
  '*.Dockerfile',
  'captain-definition',
  'compose.*',
  'docker-compose.*',
  'dockerfile*',
  'Dockerfile*',
];

// @keep-sorted
const dotClangTidy = [
  //
  '.clang-format',
  '.clangd',
  'compile_commands.json',
];

// @keep-sorted
const dotEnv = [
  //
  '.env.*',
  '.envrc',
  '*.env',
  'env.d.ts',
];

// @keep-sorted
const exFiles = [
  //
  '$(capture).html.eex',
  '$(capture).html.heex',
  '$(capture).html.leex',
];

// @keep-sorted
const flakeNIX = [
  //
  'default.nix',
  'flake.lock',
  'shell.nix',
];

// @keep-sorted
const fsFiles = [
  //
  '$(capture).fs.dart',
  '$(capture).fs.js.map',
  '$(capture).fs.js',
  '$(capture).fs.jsx',
  '$(capture).fs.php',
  '$(capture).fs.rs',
  '$(capture).fs.ts',
  '$(capture).fs.tsx',
];

// @keep-sorted
const gemfile = [
  //
  '.ruby-version',
  'gemfile.lock',
];

// @keep-sorted
const dotGitignore = [
  //
  '.git-blame*',
  '.gitattributes',
  '.gitmessage',
  '.gitmodules',
  '.lfsconfig',
  '.mailmap',
];

// @keep-sorted
const gdFiles = [
  //
  '$(capture).gd.uid',
];

// @keep-sorted
const gdshaderFiles = [
  //
  '$(capture).gdshader.uid',
];

// @keep-sorted
const gdshaderincFiles = [
  //
  '$(capture).gdshaderinc.uid',
];

// @keep-sorted
const goFiles = [
  //
  '$(capture)_test.go',
];

// @keep-sorted
const goMOD = [
  //
  '.air*',
  'go.sum',
];

// @keep-sorted
const goWORK = [
  //
  'go.work.sum',
];

// @keep-sorted
const interfaceCS = [
  //
  '$(capture).cs',
];

// @keep-sorted
const javaFiles = [
  //
  '$(capture).class',
];

// @keep-sorted
const jsFiles = [
  //
  '$(capture)_*.js',
  '$(capture).*.js',
  '$(capture).d.ts.map',
  '$(capture).d.ts',
  '$(capture).js.flow',
  '$(capture).js.LICENSE*',
  '$(capture).js.map',
];

// @keep-sorted
const jsonFiles = [
  //
  '$(capture).*.json',
  '$(capture).*.liquid',
];

// @keep-sorted
const jsxFiles = [
  //
  '$(capture)_*.js',
  '$(capture)_*.jsx',
  '$(capture).*.js',
  '$(capture).*.jsx',
  '$(capture).css.js',
  '$(capture).css',
  '$(capture).d.ts.map',
  '$(capture).d.ts',
  '$(capture).js.LICENSE*',
  '$(capture).js.map',
  '$(capture).js',
  '$(capture).jsx.flow',
  '$(capture).jsx.LICENSE*',
  '$(capture).jsx.map',
  '$(capture).less.js',
  '$(capture).less',
  '$(capture).module.css.d.ts',
  '$(capture).module.css',
  '$(capture).module.less.d.ts',
  '$(capture).module.less',
  '$(capture).module.scss.d.ts',
  '$(capture).module.scss',
  '$(capture).scss.js',
  '$(capture).scss',
];

// @keep-sorted
const layoutSVELTE = [
  //
  '+layout.gql',
  '+layout.js',
  '+layout.server.js',
  '+layout.server.ts',
  '+layout.ts',
  '+layout.ts',
];

// @keep-sorted
const makefile = [
  //
  '*.mk',
];

// @keep-sorted
const masterFiles = [
  //
  '$(capture).*.cs',
  '$(capture).*.vb',
];

// @keep-sorted
const mdFiles = [
  //
  '$(capture).*',
];

// @keep-sorted
const mixEXS = [
  //
  '.credo.exs',
  '.dialyzer_ignore.exs',
  '.formatter.exs',
  '.iex.exs',
  '.tool-versions',
  'mix.lock',
];

// @keep-sorted
const mjsFiles = [
  //
  '$(capture)_*.mjs',
  '$(capture).*.mjs',
  '$(capture).d.mts.map',
  '$(capture).d.mts',
  '$(capture).d.ts.map',
  '$(capture).d.ts',
  '$(capture).js.LICENSE*',
  '$(capture).js.map',
  '$(capture).js',
  '$(capture).mjs.LICENSE*',
  '$(capture).mjs.map',
];

// @keep-sorted
const moduleTSFiles = [
  //
  '$(capture).controller.ts',
  '$(capture).resolver.ts',
  '$(capture).service.ts',
];

// @keep-sorted
const mtsFiles = [
  //
  '$(capture)_*.mjs',
  '$(capture)_*.mts',
  '$(capture).*.mjs',
  '$(capture).*.mts',
  '$(capture).d.mts.map',
  '$(capture).d.mts',
  '$(capture).d.ts.map',
  '$(capture).d.ts',
  '$(capture).js.LICENSE*',
  '$(capture).js.map',
  '$(capture).js',
  '$(capture).mjs.LICENSE*',
  '$(capture).mjs.map',
  '$(capture).mjs',
  '$(capture).mts.LICENSE*',
  '$(capture).mts.map',
  '$(capture).ts.LICENSE*',
  '$(capture).ts.map',
];

// @keep-sorted
const pageSVELTE = [
  //
  '+page.gql',
  '+page.js',
  '+page.server.js',
  '+page.server.ts',
  '+page.ts',
];

// @keep-sorted
const pomXML = [
  //
  'mvnw*',
];

// @keep-sorted
const dotProject = [
  //
  '.classpath',
];

// @keep-sorted
const projFiles = [
  //
  '*.config',
  '*proj.user',
  'appsettings.*',
  'bundleconfig.json',
  'packages.lock.json',
];

// @keep-sorted
const protoFiles = [
  //
  '$(capture).pb.go',
  '$(capture).pb.micro.go',
];

// @keep-sorted
const pubspecYAML = [
  //
  '.metadata',
  '.packages',
  'all_lint_rules.yaml',
  'analysis_options.yaml',
  'build.yaml',
  'pubspec_overrides.yaml',
  'pubspec.lock',
];

// @keep-sorted
const pubxmlFiles = [
  //
  '$(capture).pubxml.user',
];

const pyFiles = [
  //
  '$(capture).pyc',
  '$(capture).pyd',
  '$(capture).pyi',
  '$(capture).pyo',
  '$(capture).pyw',
  '$(capture).pyz',
];

// @keep-sorted
const pythonConfigs = [
  //
  '.editorconfig',
  '.flake8',
  '.isort.cfg',
  '.python-version',
  'tox.ini',
];

// @keep-sorted
const razorFiles = [
  //
  '$(capture).razor.cs',
  '$(capture).razor.css',
  '$(capture).razor.less',
  '$(capture).razor.scss',
];

// @keep-sorted
const requirementsTXT = [
  //
  'requirements*.in',
  'requirements*.pip',
  'requirements*.txt',
  ...pythonConfigs,
];

// @keep-sorted
const resxFiles = [
  //
  '$(capture).*.resx',
  '$(capture).designer.cs',
  '$(capture).designer.vb',
];

// @keep-sorted
const s3dbFiles = [
  //
  '${capture}.${extname}-*',
];

// @keep-sorted
const sdbFiles = [
  //
  '${capture}.${extname}-*',
];

// @keep-sorted
const sqliteFiles = [
  //
  '${capture}.${extname}-*',
];

// @keep-sorted
const sqlite3Files = [
  //
  '${capture}.${extname}-*',
];

// @keep-sorted
const sanityCONFIG = [
  //
  'sanity.cli.*',
  'sanity.types.ts',
  'schema.json',
];

// @keep-sorted
const setupCFG = [
  //
  'MANIFEST.in',
  'setup.cfg',
  ...requirementsTXT,
];

// @keep-sorted
const setupPY = [
  //
  'setup.py',
  ...setupCFG,
];

// @keep-sorted
const shimsDTS = [
  //
  '*.d.ts',
];

// @keep-sorted
const texFiles = [
  //
  '$(capture).acn',
  '$(capture).acr',
  '$(capture).alg',
  '$(capture).aux',
  '$(capture).bbl-SAVE-ERROR',
  '$(capture).bbl',
  '$(capture).bcf',
  '$(capture).bib',
  '$(capture).blg',
  '$(capture).fdb_latexmk',
  '$(capture).fls',
  '$(capture).glg',
  '$(capture).glo',
  '$(capture).gls',
  '$(capture).idx',
  '$(capture).ind',
  '$(capture).ist',
  '$(capture).lof',
  '$(capture).log',
  '$(capture).lot',
  '$(capture).nav',
  '$(capture).out',
  '$(capture).pdf',
  '$(capture).run.xml',
  '$(capture).snm',
  '$(capture).synctex.gz',
  '$(capture).toc',
  '$(capture).xdv',
];

// @keep-sorted
const tsFiles = [
  //
  '$(capture)_*.js',
  '$(capture)_*.ts',
  '$(capture).*.js',
  '$(capture).*.ts',
  '$(capture).d.ts.map',
  '$(capture).d.ts',
  '$(capture).js.map',
  '$(capture).js',
  '$(capture).ts.LICENSE*',
  '$(capture).ts.map',
];

// @keep-sorted
const tsxFiles = [
  //
  '$(capture)_*.ts',
  '$(capture)_*.tsx',
  '$(capture).*.ts',
  '$(capture).*.tsx',
  '$(capture).css.ts',
  '$(capture).css',
  '$(capture).d.ts.map',
  '$(capture).d.ts',
  '$(capture).js.LICENSE*',
  '$(capture).js.map',
  '$(capture).js',
  '$(capture).less.ts',
  '$(capture).less',
  '$(capture).module.css.d.ts',
  '$(capture).module.css',
  '$(capture).module.less.d.ts',
  '$(capture).module.less',
  '$(capture).module.scss.d.ts',
  '$(capture).module.scss',
  '$(capture).scss.ts',
  '$(capture).scss',
  '$(capture).ts.LICENSE*',
  '$(capture).ts.map',
  '$(capture).ts',
  '$(capture).tsx.LICENSE*',
  '$(capture).tsx.map',
];

// @keep-sorted
const vueFiles = [
  //
  '$(capture).*.js',
  '$(capture).*.ts',
  '$(capture).story.vue',
  '$(capture).vue.LICENSE*',
];

// @keep-sorted
const wFiles = [
  //
  '$(capture).*.w',
  'I$(capture).w',
];

// @keep-sorted
const watFiles = [
  //
  '$(capture).wasm',
];

// @keep-sorted
const xamlFiles = [
  //
  '$(capture).xaml.cs',
];

// @keep-sorted
let readme = [
  //
  'AUTHORS*',
  'BACKERS*',
  'CHANGELOG*',
  'CITATION*',
  'CODE_OF_CONDUCT*',
  'CODEBASE_STRUCTURE*',
  'CODEOWNERS*',
  'CODING_GUIDELINES*',
  'CONTRIBUTING*',
  'CONTRIBUTORS*',
  'COPYING*',
  'CREDITS*',
  'GOVERNANCE*',
  'HISTORY*',
  'LICENSE*',
  'MAINTAINERS*',
  'README_*',
  'README-*',
  'RELEASE_NOTES*',
  'ROADMAP*',
  'SECURITY*',
  'SPONSORS*',
  'TODO*',
];

readme = addLowerCaseVariants(readme);
readme = addTitleCaseVariants(readme);

/*
  --------------------
    FRAMEWORKS
  --------------------
*/

// @keep-sorted
/** @type {string[]} */
const appConfig = [
  //
];

// @keep-sorted
const artisan = [
  //
  'server.php',
  'webpack.mix.js',
];

// @keep-sorted
/** @type {string[]} */
const astro = [
  //
  'astro.sidebar.*',
];

// @keep-sorted
const gatsby = [
  //
  'gatsby-browser.*',
  'gatsby-node.*',
  'gatsby-ssr.*',
  'gatsby-transformer.*',
];

// @keep-sorted
const next = [
  //
  'next-env.d.ts',
  'next-i18next.config.*',
];

// @keep-sorted
const nuxt = [
  //
  '.nuxtignore',
  '.nuxtrc',
  'app.config.*',
  'nuxt.schema',
];

// @keep-sorted
const quasar = [
  //
  'quasar.extensions.json',
];

// @keep-sorted
const remix = [
  //
  'remix.*',
];

// @keep-sorted
const svelte = [
  //
  'houdini.config.*',
  'mdsvex.config.js',
  'vite.config.*',
];

// @keep-sorted
/** @type {string[]} */
const vite = [
  //
];

// @keep-sorted
/** @type {string[]} */
const vue = [
  //
];

// @keep-sorted
/** @type {{ [key: string]: string[] }} */
const frameworks = {
  //
  'app.config.*': appConfig,
  'artisan': artisan,
  'astro.config.*': astro,
  'gatsby-config.*': gatsby,
  'next.config.*': next,
  'nuxt.config.*': nuxt,
  'quasar.conf.*': quasar,
  'remix.config.*': remix,
  'svelte.config.*': svelte,
  'vite.config.*': vite,
  'vue.config.*': vue,
};

/*
  --------------------
    SPREAD
  --------------------
*/

// @keep-sorted
const denoJSON = [
  //
  'deno.lock',
  'import_map.json',
  'import-map.json',
  ...dotEnv,
  ...tsconfigJSON,
];

// @keep-sorted
const hatchTOML = [
  //
  'hatch.toml',
  ...requirementsTXT,
];

// @keep-sorted
const libraries = [
  //
  '.babelrc*',
  '.cssnanorc*',
  '.htmlnanorc*',
  '.postcssrc*',
  '.terserrc*',
  'babel.config.*',
  'capacitor.config.*',
  'content.config.*',
  'contentlayer.config.*',
  'cssnano.config.*',
  'formkit.config.*',
  'formulate.config.*',
  'htmlnanorc.*',
  'i18n.config.*',
  'ionic.config.*',
  'lunaria.config.*',
  'panda.config.*',
  'postcss.config.*',
  'react-router.config.*',
  'rspack.config.*',
  'sst.config.*',
  'svgo.config.*',
  'tailwind.config.*',
  'uno.config.*',
  'unocss.config.*',
  'vuetify.config.*',
  'webpack.config.*',
  'windi.config.*',
  ...dotEnv,
  ...testingTools,
  ...tsconfigJSON,
];

// @keep-sorted
const packageJSON = [
  //
  '.attw.json*',
  '.browserslist*',
  '.changelogithub*',
  '.cz-config.js',
  '.cz.*',
  '.czrc*',
  '.ncurc*',
  '.nodemon*',
  '.pm2*',
  '.versionrc*',
  '.vscode*',
  '.watchman*',
  'apollo.config.*',
  'attw.json*',
  'changelogithub.config.*',
  'lefthook.*',
  'manifest.json',
  'manifest.webmanifest',
  'nest-cli.*',
  'nodemon*',
  'pm2.*',
  'project-words.txt',
  'pwa-assets.config.*',
  'pwa.config.*',
  'typedoc*',
  'vetur.config.*',
  'webmanifest.json',
  ...buildTools,
  ...dependencyAnalysis,
  ...linters,
  ...services,
  ...syntaxHighlighting,
  ...testingTools,
  ...workspaces,
];

// @keep-sorted
const pipfile = [
  //
  'Pipfile.lock',
  'Pipfile',
  ...requirementsTXT,
];

// @keep-sorted
const pyprojectTOML = [
  //
  '.pdm-python',
  '.pdm.toml',
  'pdm.lock',
  'poetry.lock',
  'poetry.toml',
  'pyproject.toml',
  'uv.lock',
  'uv.toml',
  ...hatchTOML,
  ...linters,
  ...pipfile,
  ...setupPY,
];

// @keep-sorted
const esprojFiles = [
  //
  ...projFiles,
  ...libraries,
  ...Object.keys(frameworks),
];

/*
  --------------------
    COMPILATION
  --------------------
*/

// @keep-sorted-disabled
/** @type {{ [key: string]: string[] }} */
const basePatterns = {
  '*.asax': asaxFiles,
  '*.ascx': ascxFiles,
  '*.ashx': ashxFiles,
  '*.aspx': aspxFiles,
  '*.axaml': axamlFiles,
  '*.bloc.dart': blocDARTFiles,
  '*.c': cFiles,
  '*.cc': ccFiles,
  '*.cjs': cjsFiles,
  '*.component.ts': componentTSFiles,
  '*.cpp': cppFiles,
  '*.cs': csFiles,
  '*.cshtml': cshtmlFiles,
  '*.csproj': projFiles,
  '*.css': cssFiles,
  '*.cts': ctsFiles,
  '*.cxx': cxxFiles,
  '*.dart': dartFiles,
  '*.db': dbFiles,
  '*.db3': db3Files,
  '*.esproj': esprojFiles,
  '*.ex': exFiles,
  '*.fs': fsFiles,
  '*.fsproj': projFiles,
  '*.gd': gdFiles,
  '*.gdshader': gdshaderFiles,
  '*.gdshaderinc': gdshaderincFiles,
  '*.go': goFiles,
  '*.java': javaFiles,
  '*.js': jsFiles,
  '*.json': jsonFiles,
  '*.jsx': jsxFiles,
  '*.master': masterFiles,
  '*.md': mdFiles,
  '*.mjs': mjsFiles,
  '*.module.ts': moduleTSFiles,
  '*.mts': mtsFiles,
  '*.proto': protoFiles,
  '*.pubxml': pubxmlFiles,
  '*.py': pyFiles,
  '*.razor': razorFiles,
  '*.resx': resxFiles,
  '*.s3db': s3dbFiles,
  '*.sdb': sdbFiles,
  '*.sqlite': sqliteFiles,
  '*.sqlite3': sqlite3Files,
  '*.tex': texFiles,
  '*.ts': tsFiles,
  '*.tsx': tsxFiles,
  '*.vbproj': projFiles,
  '*.vue': vueFiles,
  '*.w': wFiles,
  '*.wat': watFiles,
  '*.xaml': xamlFiles,
  '+layout.svelte': layoutSVELTE,
  '+page.svelte': pageSVELTE,
  '.clang-tidy': dotClangTidy,
  '.env': dotEnv,
  '.gitignore': dotGitignore,
  '.project': dotProject,
  'AGENTS.md': agents,
  'ansible.cfg': ansibleCFG,
  'app.tsx': appTSX,
  'application.properties': applicationPROPERTIES,
  'build-wrapper.log': buildWrapperLOG,
  'BUILD.bazel': buildBAZEL,
  'Cargo.toml': cargoTOML,
  'CMakeLists.txt': cMakeListsTXT,
  'composer.json': composerJSON,
  'default.nix': defaultNIX,
  'deno.json*': denoJSON,
  'Dockerfile*': dockerfile,
  'flake.nix': flakeNIX,
  'gemfile': gemfile,
  'go.mod': goMOD,
  'go.work': goWORK,
  'hatch.toml': hatchTOML,
  'I*.cs': interfaceCS,
  'Makefile': makefile,
  'mise.toml': mise,
  'mix.exs': mixEXS,
  'package.json': packageJSON,
  'Pipfile': pipfile,
  'pom.xml': pomXML,
  'pubspec.yaml': pubspecYAML,
  'pyproject.toml': pyprojectTOML,
  'readme*': readme,
  'Readme*': readme,
  'README*': readme,
  'requirements.txt': requirementsTXT,
  'rush.json': packageJSON,
  'sanity.config.*': sanityCONFIG,
  'setup.cfg': setupCFG,
  'setup.py': setupPY,
  'shims.d.ts': shimsDTS,
  'tsconfig.json': tsconfigJSON,
};

const baseObj = Object.fromEntries(
  Object.entries(basePatterns).map(([key, value]) => [key, stringify([...value])]),
);

const frameworksObj = Object.fromEntries(
  Object.entries(frameworks).map(([key, value]) => [
    //
    key,
    stringify([...value, ...libraries]),
  ]),
);

/** @type {{ [key: string]: string }} */
const fullObj = sortObject(
  {
    ...baseObj,
    ...frameworksObj,
  },
  (a, b) => {
    if (a.startsWith('*') && !b.startsWith('*')) return -1;
    if (!a.startsWith('*') && b.startsWith('*')) return 1;
    return a.localeCompare(b);
  },
);

/*
  --------------------
    CHECK FUNCTIONS
  --------------------
*/

/**
 * Throw an error if any of the values contain multiple wildcards.
 *
 * @see https://github.com/antfu/vscode-file-nesting-config/pull/245
 */
for (const [key, value] of Object.entries(fullObj)) {
  const items = value.split(',').map((i) => i.trim());
  const itemWithMultipleWildcards = items.find((i) => i.split('*').length > 2);
  if (itemWithMultipleWildcards)
    throw new Error(
      `Multiple wildcards are not allowed, found in ${key}: ${itemWithMultipleWildcards}`,
    );
}

/*
  --------------------
    UPDATER FUNCTIONS
  --------------------
*/

export function updateReadme(path = './README.md') {
  try {
    const fileContent = fs.readFileSync(path, 'utf8');

    const replaceRegEx = /```jsonc?\n\s*"explorer.fileNesting.enabled": true,\n[\s\S]*?```/;

    const patterns = JSON.stringify(fullObj, undefined, 2)
      .split('\n')
      .map((l) => `  ${l}`)
      .join('\n')
      .trimStart();

    const replaceContent = `
\`\`\`jsonc
  "explorer.fileNesting.enabled": true,
  "explorer.fileNesting.expand": false,
  // updated at: ${today}
  "explorer.fileNesting.patterns": ${patterns.trimStart()},
\`\`\``.trim();

    const newContent = fileContent.replace(replaceRegEx, replaceContent);

    fs.writeFileSync(path, newContent, 'utf8');
  } catch (error) {
    console.log(error);
  }
}

export function updateSettingsJson(path = './.vscode/settings.json') {
  try {
    const fileContent = fs.readFileSync(path, 'utf8');

    const replaceRegEx =
      /^(\s*\/\/.*?update.*\n)?(\s*\/\/.*?http.*\n)?(\s*)([<"]explorer\.fileNesting\.patterns[">]): \{[\s\S]*?\},$/m;

    const patterns = JSON.stringify(fullObj, undefined, 2)
      .split('\n')
      .map((l) => `  ${l}`)
      .join('\n')
      .trimStart();

    const replaceContent = `$3// updated at: ${today}\n$3$4: ${patterns},`.trim();

    const newContent = fileContent.replace(replaceRegEx, replaceContent);

    fs.writeFileSync(path, newContent, 'utf8');
  } catch (error) {
    console.log(error);
  }
}

/*
  --------------------
    EXECUTION
  --------------------
*/
const basePath = `${import.meta.dirname}/../../..`;

console.log(basePath);

updateReadme(`${basePath}/dotfiles/scripts/node/file-nesting-config-readme.md`);
updateSettingsJson(`${basePath}/dotfiles/preferences/vscode/data/user-data/User/settings.json`);
