# `pnpm`

## `pnpm approve-builds`

[`pnpm`](https://pnpm.io) has an essential feature called [`pnpm approve-builds`](https://pnpm.io/cli/approve-builds).
It is especially useful for a Windows platform, as it is the most targeted platform for malware and malicious actors.
Ideally, we even should manually check dependencies with scripts before updating and executing them.

## Reasoning

- <https://github.com/prettier/eslint-config-prettier/issues/339>
- <https://github.com/prettier/eslint-plugin-prettier/issues/752>
- <https://x.com/JounQin/status/1946297662069993690>
- <https://x.com/ljharb/status/1946636509601538233>
- <https://socket.dev/blog/npm-phishing-email-targets-developers-with-typosquatted-domain>
- <https://socket.dev/blog/npm-phishing-campaign-leads-to-prettier-tooling-packages-compromise>
- <https://www.linkedin.com/pulse/microsoft-defender-nodejs-supply-chain-security-alert-adair-collins-jwlce>
- <https://www.virustotal.com/gui/file/c68e42f416f482d43653f36cd14384270b54b68d6496a8e34ce887687de5b441>

## Malware-Affected Packages

- [`@pkgr/core`](https://www.npmjs.com/package/@pkgr/core):
  - 0.2.8
- [`eslint-config-prettier`](https://www.npmjs.com/package/eslint-config-prettier):
  - 8.10.1
  - 9.1.1
  - 10.1.6
  - 10.1.7
- [`eslint-plugin-prettier`](https://www.npmjs.com/package/eslint-plugin-prettier):
  - 4.2.2
  - 4.2.3
- [`is`](https://www.npmjs.com/package/is):
  - 3.3.1
- [`napi-postinstall`](https://www.npmjs.com/package/napi-postinstall):
  - 0.3.1
- [`synckit`](https://www.npmjs.com/package/synckit):
  - 0.11.9
