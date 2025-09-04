import { type CommitlintConfig, commitlintConfig } from '@astrochemx/commitlint-config';

export default {
  ...commitlintConfig,
} as const satisfies CommitlintConfig;
