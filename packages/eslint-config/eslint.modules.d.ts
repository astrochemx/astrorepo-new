declare module '@eslint-community/eslint-plugin-eslint-comments' {
  import type { ESLint, Linter } from 'eslint';
  const plugin: {
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
  export default plugin satisfies ESLint.Plugin;
}

declare module '@eslint-community/eslint-plugin-eslint-comments/configs' {
  import type { Linter } from 'eslint';
  const recommended: Linter.LegacyConfig;
  export = { recommended } satisfies ESLint.Plugin;
}

declare module '@next/eslint-plugin-next' {
  import type { ESLint, Linter } from 'eslint';
  const plugin: {
    configs: {
      'core-web-vitals': Record<string, Linter.LegacyConfig>;
      'recommended': Record<string, Linter.LegacyConfig>;
    };
    rules: ESLint.Plugin['rules'];
  };
  const flatConfig: {
    coreWebVitals: Record<string, Linter.Config>;
    recommended: Record<string, Linter.Config>;
  };
  export = { ...plugin, flatConfig } satisfies ESLint.Plugin;
}

declare module 'eslint-config-biome' {
  import type { ESLint } from 'eslint';
  const rules: ESLint.Plugin['rules'];
  export = { rules } satisfies ESLint.Plugin;
}

declare module 'eslint-plugin-barrel-files' {
  import type { ESLint, Linter } from 'eslint';
  const plugin: {
    configs: {
      recommended: {
        plugins: Linter.Config['plugins'];
        rules: Linter.Config['rules'];
      };
    };
    meta: ESLint.Plugin['meta'];
    processors: ESLint.Plugin['processors'];
    rules: ESLint.Plugin['rules'];
  };
  export default plugin satisfies ESLint.Plugin;
}

declare module 'eslint-plugin-html' {
  import type { ESLint } from 'eslint';
  const plugin: ESLint.Plugin;
  export default plugin satisfies ESLint.Plugin;
}

declare module 'eslint-plugin-no-only-tests' {
  import type { ESLint } from 'eslint';
  const rules: ESLint.Plugin['rules'];
  export = { rules } satisfies ESLint.Plugin;
}

declare module 'eslint-plugin-promise' {
  import type { ESLint, Linter } from 'eslint';
  const configs: {
    'flat/recommended': Linter.Config;
    'recommended': Linter.BaseConfig;
  };
  export = { configs } satisfies ESLint.Plugin;
}

declare module 'eslint-plugin-react-perf' {
  import type { ESLint, Linter } from 'eslint';
  const meta: ESLint.Plugin['meta'];
  const rules: ESLint.Plugin['rules'];
  const configs: {
    all: Linter.BaseConfig;
    flat: {
      all: Linter.Config;
      recommended: Linter.Config;
    };
    recommended: Linter.BaseConfig;
  };
  export = { configs, meta, rules } satisfies ESLint.Plugin;
}

declare module 'eslint-plugin-vue-composable' {
  import type { ESLint, Linter } from 'eslint';
  const meta: ESLint.Plugin['meta'];
  const rules: ESLint.Plugin['rules'];
  const configs: {
    'flat/recommended': Linter.Config[];
    'recommended': Linter.BaseConfig;
  };
  export = { configs, meta, rules } satisfies ESLint.Plugin;
}
