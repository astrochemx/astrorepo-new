# Development

After [forking the repo](https://help.github.com/articles/fork-a-repo) from GitHub and [installing pnpm](https://pnpm.io/installation):

1. [Clone the repo](https://git-scm.com/docs/git-clone):

   ```shell
   git clone https://github.com/astrochemx/astrorepo
   ```

2. [Enter the project's root](<https://en.wikipedia.org/wiki/Cd_(command)>):

   ```shell
   cd ./astrorepo
   ```

3. [Install dependencies](https://pnpm.io/cli/install):
   ```shell
   pnpm i
   ```

> [!TIP]
> This repository includes a list of VS Code [recommended extensions](../.vscode/extensions.json) [^(?)^](https://code.visualstudio.com/docs/configure/extensions/extension-marketplace).
> It's a good idea to use [VS Code](https://code.visualstudio.com/download) and accept its suggestion to install them, as they will help with development.

## Building

To build the project run:

```shell
pnpm run build
```

Add `--watch` to run the builder in a watch mode that continuously cleans and recreates output folder as you save files:

```shell
pnpm run build:watch
```

## Debugging

This repository includes a VS Code [launch configuration](../.vscode/launch.json) [^(?)^](https://code.visualstudio.com/docs/debugtest/debugging-configuration) for debugging.

## Formatting

[Prettier](https://prettier.io) is used to format code.
It should be applied automatically when you save files in VS Code or make a [`git commit`](https://git-scm.com/docs/git-commit).

To check format of all files, run:

```shell
pnpm run check:prettier
```

To reformat all files, you can run:

```shell
pnpm run fix:prettier
```

## Linting

This project includes several forms of linting to enforce consistent code quality and styling.
Each should be shown in VS Code, and can be run manually on the command-line:

- `pnpm run check:attw` -- [**@arethetypeswrong/cli**](https://github.com/arethetypeswrong/arethetypeswrong.github.io): _analyzes npm package contents for issues with their TypeScript types_
- `pnpm run check:biome` -- [**Biome**](https://biomejs.dev): _lints and formats source files_
- `pnpm run check:cspell` -- [**CSpell**](https://cspell.org): _checks the spelling across all source files_
- `pnpm run check:dedupe` -- [**`pnpm dedupe --check`**](https://pnpm.io/cli/dedupe): _checks for unnecessarily duplicated packages in the `pnpm-lock.yml` file_
- `pnpm run check:eslint` -- [**ESLint**](https://eslint.org) with [**typescript-eslint**](https://typescript-eslint.io): _lints and formats source files_
- `pnpm run check:knip` -- [**Knip**](https://knip.dev): _detects unused files, dependencies, and code exports_
- `pnpm run check:markdown` -- [**markdownlint**](https://github.com/DavidAnson/markdownlint): _checks Markdown source files_
- `pnpm run check:oxlint` -- [**Oxlint**](https://oxc.rs/docs/guide/usage/linter.html): _lints source files with [**Oxc**](https://oxc.rs)_
- `pnpm run check:package` -- [**sort-package-json**](https://github.com/keithamus/sort-package-json): _sorts `package.json` based on the well-known keys_
- `pnpm run check:prettier` -- [**Prettier**](https://prettier.io) with [**@prettier/plugin-oxc**](https://prettier.io/blog/2025/06/23/3.6.0#javascript): _formats source files_
- `pnpm run check:tsc` -- [**`tsc --noEmit`**](https://www.typescriptlang.org/docs/handbook/compiler-options.html): _checks the types in the source code with [**`typescript`**](https://www.npmjs.com/package/typescript)_
- `pnpm run check:tsgo` -- [**`tsgo --noEmit`**](https://github.com/microsoft/typescript-go?tab=readme-ov-file): _checks the types in the source code with [**`@typescript/native-preview`**](https://www.npmjs.com/package/@typescript/native-preview)_

Read the individual documentation for each linter to understand how it can be configured and used best.

You can run similar commands with the `fix:*` prefix to auto-fix some of the complaints:

```shell
pnpm run fix:biome
pnpm run fix:dedupe
pnpm run fix:eslint
pnpm run fix:knip
pnpm run fix:oxlint
pnpm run fix:package
pnpm run fix:prettier
```

> [!NOTE]
> You will need to run `pnpm run build` before `pnpm run check:esl` or `pnpm run fix:esl` so that lint rules which check the file system can pick up on any built files.

## Testing

[Vitest](https://vitest.dev) is used for tests.

You can run it locally on the command-line:

```shell
pnpm run test:vitest
```

To compute test coverage and place reports in the `./coverage/` directory run:

```shell
pnpm run test:vitest:coverage
```

## Type Checking

You should be able to see suggestions from [TypeScript](https://typescriptlang.org) in your editor for all open files.

However, it can be useful to run the TypeScript command-line ([`tsc --noEmit`](https://www.typescriptlang.org/docs/handbook/compiler-options.html)) to type check all files:

```shell
pnpm run check:tsc
```

Add `--watch` to keep the type checker running in a watch mode that updates the display as you save files:

```shell
pnpm run check:tsc:watch
```
