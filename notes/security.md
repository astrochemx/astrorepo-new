# `pnpm`

## `pnpm approve-builds`

[`pnpm`](https://pnpm.io) has an essential CLI command called [`pnpm approve-builds`](https://pnpm.io/cli/approve-builds).
It is especially useful for a Windows platform, as it is the most targeted platform for malware and malicious actors.
Ideally, we even should manually check dependencies with scripts before updating and executing them.

## `pnpm-workspace.yaml`

[`pnpm`](https://pnpm.io) also has some essential fields in [`pnpm-workspace.yaml`](https://pnpm.io/settings) file:

- [`onlyBuiltDependencies`](https://pnpm.io/settings#onlybuiltdependencies)
  - This configuration option allows users to specify a JSON file that lists the only packages permitted to run installation scripts during the pnpm install process. By using this, you can enhance security or ensure that only specific dependencies execute scripts during installation.
- [`ignoredBuiltDependencies`](https://pnpm.io/settings#ignoredbuiltdependencies)
  - A list of package names that should not be built during installation.

## Reasoning & References

- <https://arxiv.org/html/2403.12196v2>
- <https://gist.github.com/sindresorhus/2b7466b1ec36376b8742dc711c24db20>
- <https://github.com/chalk/chalk/issues/656>
- <https://github.com/debug-js/debug/issues/1005>
- <https://github.com/MartinGross/compromised_npm_package_checker>
- <https://github.com/prettier/eslint-config-prettier/issues/339>
- <https://github.com/prettier/eslint-plugin-prettier/issues/752>
- <https://github.com/scttcper/tinycolor/issues/256>
- <https://github.com/Security-Phoenix-demo/Qxi-npm-compromise-checker>
- <https://github.com/Security-Phoenix-demo/Shai-Hulud-Hulud-Shai-npm-tinycolour-compromise-verifier>
- <https://jdstaerk.substack.com/p/we-just-found-malicious-code-in-the>
- <https://news.ycombinator.com/item?id=44609732>
- <https://news.ycombinator.com/item?id=45169657>
- <https://news.ycombinator.com/item?id=45169794>
- <https://news.ycombinator.com/item?id=45260741>
- <https://phoenix.security/npm-shai-hulud-tinycolor-compromise>
- <https://phoenix.security/qix-npm-compromise>
- <https://semgrep.dev/blog/2025/security-advisory-npm-packages-using-secret-scanning-tools-to-steal-credentials>
- <https://semgrep.dev/blog/2025/security-alert-nx-compromised-to-steal-wallets-and-credentials>
- <https://sigh.dev/posts/ctrl-tinycolor-post-mortem>
- <https://socket.dev/blog/npm-author-qix-compromised-in-major-supply-chain-attack>
- <https://socket.dev/blog/npm-phishing-campaign-leads-to-prettier-tooling-packages-compromise>
- <https://socket.dev/blog/npm-phishing-email-targets-developers-with-typosquatted-domain>
- <https://socket.dev/blog/nx-packages-compromised>
- <https://socket.dev/blog/ongoing-supply-chain-attack-targets-crowdstrike-npm-packages>
- <https://socket.dev/blog/tinycolor-supply-chain-attack-affects-40-packages>
- <https://vercel.com/blog/critical-npm-supply-chain-attack-response-september-8-2025>
- <https://www.aikido.dev/blog/introducing-safe-chain>
- <https://www.aikido.dev/blog/npm-debug-and-chalk-packages-compromised>
- <https://www.aikido.dev/blog/s1ngularity-nx-attackers-strike-again>
- <https://www.bleepingcomputer.com/news/security/hackers-hijack-npm-packages-with-2-billion-weekly-downloads-in-supply-chain-attack>
- <https://www.bleepingcomputer.com/news/security/infostealer-campaign-compromises-10-npm-packages-targets-devs>
- <https://www.bleepingcomputer.com/news/security/popular-npm-linter-packages-hijacked-via-phishing-to-drop-malware>
- <https://www.getsafety.com/blog-posts/shai-hulud-npm-attack>
- <https://www.linkedin.com/posts/advocatemack_crowdstrike-has-had-its-npm-packages-compromised-activity-7373625746822696960-w8xz/?rcm=ACoAAAXYN_oBdp0mXzKH9fuAofjdchqyKsoY6jM>
- <https://www.linkedin.com/pulse/microsoft-defender-nodejs-supply-chain-security-alert-adair-collins-jwlce>
- <https://www.ox.security/blog/npm-2-0-hack-40-npm-packages-hit-in-major-supply-chain-attack>
- <https://www.ox.security/blog/npm-packages-compromised>
- <https://www.stepsecurity.io/blog/ctrl-tinycolor-and-40-npm-packages-compromised>
- <https://www.stepsecurity.io/blog/supply-chain-security-alert-eslint-config-prettier-package-shows-signs-of-compromise>
- <https://www.stepsecurity.io/blog/supply-chain-security-alert-popular-nx-build-system-package-compromised-with-data-stealing-malware>
- <https://www.virustotal.com/gui/file/c68e42f416f482d43653f36cd14384270b54b68d6496a8e34ce887687de5b441>
- <https://www.wiz.io/blog/s1ngularity-supply-chain-attack>
- <https://www.wiz.io/blog/shai-hulud-npm-supply-chain-attack>
- <https://www.youtube.com/watch?v=cxJPiMwoIyY>
- <https://x.com/JounQin/status/1946297662069993690>
- <https://x.com/ljharb/status/1946636509601538233>
