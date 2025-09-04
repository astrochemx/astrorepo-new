# `pnpm`

## [`pnpm-workspace.yaml`](https://pnpm.io/settings) | [`.pnpmfile.cjs`](https://pnpm.io/pnpmfile)

- If we use pnpm's [`enableGlobalVirtualStores: true`](https://pnpm.io/settings#enableglobalvirtualstore) feature, [`simple-git-hooks`](https://www.npmjs.com/package/simple-git-hooks) doesn't work, but [`husky`](https://www.npmjs.com/package/husky) works!
- If we set [`enableGlobalVirtualStores: true`](https://pnpm.io/settings#enableglobalvirtualstore) or [`hoistPattern: ['*']`](https://pnpm.io/settings#hoistpattern), we can't use [`prettier`](https://github.com/prettier), because it is unable to resolve certain modules correctly.
