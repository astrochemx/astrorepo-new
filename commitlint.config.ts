import { commitlintConfig, type CommitlintConfig } from '@astrochemx/commitlint-config';

export default {
  ...commitlintConfig,
} as const satisfies CommitlintConfig;
