import { RuleConfigSeverity, type RulesConfig } from '@commitlint/types';

export const rules: Partial<RulesConfig> = {
  'body-leading-blank': [RuleConfigSeverity.Warning, 'always'],
  'body-max-line-length': [RuleConfigSeverity.Warning, 'always', 100],
  'footer-leading-blank': [RuleConfigSeverity.Warning, 'always'],
  'footer-max-line-length': [RuleConfigSeverity.Warning, 'always', 100],
  'header-max-length': [RuleConfigSeverity.Warning, 'always', 100],
  'header-trim': [RuleConfigSeverity.Warning, 'always'],
  'scope-case': [RuleConfigSeverity.Warning, 'always', 'lower-case'],
  'scope-empty': [RuleConfigSeverity.Disabled, 'never'],
  'subject-case': [
    RuleConfigSeverity.Warning,
    'never',
    ['sentence-case', 'start-case', 'pascal-case', 'upper-case'],
  ],
  'subject-empty': [RuleConfigSeverity.Warning, 'never'],
  'subject-full-stop': [RuleConfigSeverity.Warning, 'never', '.'],
  'subject-emoji': [RuleConfigSeverity.Warning, 'always'],
  'type-case': [RuleConfigSeverity.Warning, 'always', 'lower-case'],
  'type-empty': [RuleConfigSeverity.Warning, 'never'],
  'type-enum': [
    RuleConfigSeverity.Warning,
    'always',
    ['build', 'chore', 'ci', 'docs', 'feat', 'fix', 'perf', 'refactor', 'revert', 'style', 'test'],
  ],
} as const satisfies Partial<RulesConfig>;
