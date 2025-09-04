declare module 'eslint-plugin-html' {
  import type { ESLint } from 'eslint';
  const pluginReference: ESLint.Plugin;
  export = pluginReference;
}

declare module '@eslint-community/eslint-plugin-eslint-comments' {
  import type { ESLint, Linter } from 'eslint';
  const exports: {
    configs: {
      recommended: {
        plugins: Linter.LegacyConfig['plugins'];
        rules: Linter.LegacyConfig['rules'];
      };
    };
    rules: ESLint.Plugin['rules'];
    utils: {
      patch: (ruleId = '@eslint-community/eslint-comments/no-unused-disable') => unknown;
    };
  };

  export = exports;
}

declare module '@eslint-community/eslint-plugin-eslint-comments/configs' {
  import type { Linter } from 'eslint';
  const recommended: Linter.LegacyConfig;
  export = { recommended };
}

declare module '@next/eslint-plugin-next' {
  import type { ESLint, Linter } from 'eslint';
  const plugin: {
    configs: {
      'recommended': Record<string, Linter.LegacyConfig>;
      'core-web-vitals': Record<string, Linter.LegacyConfig>;
    };
    rules: ESLint.Plugin['rules'];
  };
  const flatConfig: {
    recommended: Record<string, Linter.Config>;
    coreWebVitals: Record<string, Linter.Config>;
  };
  export = { ...plugin, flatConfig };
}

declare module 'eslint-plugin-promise' {
  import type { Linter } from 'eslint';
  const configs: {
    'recommended': Linter.BaseConfig;
    'flat/recommended': Linter.Config;
  };
  export = { configs };
}

declare module 'eslint-plugin-react-perf' {
  import type { Linter, ESLint } from 'eslint';
  const meta: ESLint.Plugin['meta'];
  const rules: ESLint.Plugin['rules'];
  const configs: {
    recommended: Linter.BaseConfig;
    all: Linter.BaseConfig;
    flat: {
      recommended: Linter.Config;
      all: Linter.Config;
    };
  };
  export = { meta, rules, configs } satisfies ESLint.Plugin;
}

declare module 'eslint-plugin-vue-composable' {
  import type { ESLint, Linter } from 'eslint';
  const meta: ESLint.Plugin['meta'];
  const rules: ESLint.Plugin['rules'];
  const configs: {
    'recommended': Linter.BaseConfig;
    'flat/recommended': Linter.Config[];
  };
  export = { meta, rules, configs };
}

declare module 'eslint-plugin-no-only-tests' {
  import type { ESLint } from 'eslint';
  const rules: ESLint.Plugin['rules'];
  export = { rules };
}
