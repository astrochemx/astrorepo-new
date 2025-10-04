// @ts-check

import fs from 'node:fs';
import path from 'node:path';
import yaml from 'yaml';

const baseDir = process.argv[2] || path.resolve('.');
const lockfilePath = path.resolve(baseDir, 'pnpm-lock.yaml');

if (!fs.existsSync(lockfilePath)) {
  console.error(`❌ Lockfile ('pnpm-lock.yaml') not found in: '${baseDir}'`);
  process.exit(1);
}

/** @type {Record<string, string[]>} */
const bannedDeps = {
  '@pkgr/core': ['0.2.8'],
  'ansi-regex': ['6.2.1'],
  'ansi-styles': ['6.2.2'],
  'backslash': ['0.2.1'],
  'chalk-template': ['1.1.1'],
  'chalk': ['5.6.1'],
  'color-convert': ['3.1.1'],
  'color-name': ['2.0.1'],
  'color-string': ['2.1.1'],
  'color': ['5.0.1'],
  'debug': ['4.4.2'],
  'eslint-config-prettier': ['8.10.1', '9.1.1', '10.1.6', '10.1.7'],
  'eslint-plugin-prettier': ['4.2.2', '4.2.3'],
  'has-ansi': ['6.0.1'],
  'is-arrayish': ['0.3.3'],
  'is': ['3.3.1'],
  'napi-postinstall': ['0.3.1'],
  'simple-swizzle': ['0.2.3'],
  'slice-ansi': ['7.1.1'],
  'strip-ansi': ['7.1.1'],
  'supports-color': ['10.2.1'],
  'supports-hyperlinks': ['4.1.1'],
  'synckit': ['0.11.9'],
  'wrap-ansi': ['9.0.1'],
};

const content = fs.readFileSync(lockfilePath, 'utf8');
const parsed = yaml.parse(content);

/** @type {string[]} */
const structuredMatches = [];

/** @type {string[]} */
const regexMatches = [];

Object.entries(bannedDeps).forEach(([pkgName, versions]) => {
  // 1. Structured lockfile key match
  Object.keys(parsed.packages || {}).forEach((depKey) => {
    if (versions.length === 0) {
      if (depKey.startsWith(pkgName)) {
        structuredMatches.push(`${pkgName} (lockfile key: ${depKey})`);
      }
    } else {
      versions.forEach((version) => {
        if (
          depKey === `${pkgName}@${version}` ||
          (depKey === pkgName && parsed.packages[depKey]?.version === version)
        ) {
          structuredMatches.push(`${pkgName}@${version} (lockfile key: ${depKey})`);
        }
      });
    }
  });

  // 2. Raw text match
  if (versions.length === 0) {
    const patterns = [
      new RegExp(
        `^\\s*${pkgName}:\\s*['"]?(?<version>(latest|rc|beta|next|canary)?[>=^\\d+].*?)['"]?[\\s;]?$`,
        'gm',
      ),
      new RegExp(
        `^\\s*${pkgName}:\\s*specifier:\\s*['"]?(?<version>(latest|rc|beta|next|canary)?[>=^\\d+].*?)['"]?[\\s;]?$`,
        'gm',
      ),
      new RegExp(
        `^\\s*${pkgName}:\\s*version:\\s*['"]?(?<version>(latest|rc|beta|next|canary)?[>=^\\d+].*?)['"]?[\\s;]?$`,
        'gm',
      ),
      new RegExp(
        `^\\s*'${pkgName}':\\s*['"]?(?<version>(latest|rc|beta|next|canary)?[>=^\\d+].*?)['"]?[\\s;]?$`,
        'gm',
      ),
      new RegExp(
        `^\\s*'${pkgName}':\\s*specifier:\\s*['"]?(?<version>(latest|rc|beta|next|canary)?[>=^\\d+].*?)['"]?[\\s;]?$`,
        'gm',
      ),
      new RegExp(
        `^\\s*'${pkgName}':\\s*version:\\s*['"]?(?<version>(latest|rc|beta|next|canary)?[>=^\\d+].*?)['"]?[\\s;]?$`,
        'gm',
      ),
      new RegExp(
        `^\\s*"${pkgName}":\\s*['"]?(?<version>(latest|rc|beta|next|canary)?[>=^\\d+].*?)['"]?[\\s;]?$`,
        'gm',
      ),
      new RegExp(
        `^\\s*"${pkgName}":\\s*specifier:\\s*['"]?(?<version>(latest|rc|beta|next|canary)?[>=^\\d+].*?)['"]?[\\s;]?$`,
        'gm',
      ),
      new RegExp(
        `^\\s*"${pkgName}":\\s*version:\\s*['"]?(?<version>(latest|rc|beta|next|canary)?[>=^\\d+].*?)['"]?[\\s;]?$`,
        'gm',
      ),
    ];

    patterns.forEach((pattern) => {
      const matches = [...content.matchAll(pattern)];
      matches.forEach((match) => {
        regexMatches.push(
          `${pkgName}@${match.groups?.['version']}\n   - matched text:\n     <start>\n${match[0]}\n     <end>`,
        );
      });
    });
  } else {
    versions.forEach((version) => {
      const patterns1 = [
        `${pkgName}: ${version}`,
        `${pkgName}: '${version}'`,
        `${pkgName}: "${version}"`,
        `'${pkgName}': ${version}`,
        `'${pkgName}': '${version}'`,
        `'${pkgName}': "${version}"`,
        `"${pkgName}": ${version}`,
        `"${pkgName}": '${version}'`,
        `"${pkgName}": "${version}"`,
      ];

      patterns1.forEach((pattern) => {
        if (content.includes(pattern)) {
          regexMatches.push(`${pkgName}@${version} (matched text: "${pattern}")`);
        }
      });

      const patterns2 = [
        new RegExp(`^\\s*${pkgName}:\\s*['"]?${version}['"]?[\\s;]?$`, 'gm'),
        new RegExp(`^\\s*${pkgName}:\\s*specifier:\\s*['"]?${version}['"]?[\\s;]?$`, 'gm'),
        new RegExp(`^\\s*${pkgName}:\\s*version:\\s*['"]?${version}['"]?[\\s;]?$`, 'gm'),
        new RegExp(`^\\s*'${pkgName}':\\s*['"]?${version}['"]?[\\s;]?$`, 'gm'),
        new RegExp(`^\\s*'${pkgName}':\\s*specifier:\\s*['"]?${version}['"]?[\\s;]?$`, 'gm'),
        new RegExp(`^\\s*'${pkgName}':\\s*version:\\s*['"]?${version}['"]?[\\s;]?$`, 'gm'),
        new RegExp(`^\\s*"${pkgName}":\\s*['"]?${version}['"]?[\\s;]?$`, 'gm'),
        new RegExp(`^\\s*"${pkgName}":\\s*specifier:\\s*['"]?${version}['"]?[\\s;]?$`, 'gm'),
        new RegExp(`^\\s*"${pkgName}":\\s*version:\\s*['"]?${version}['"]?[\\s;]?$`, 'gm'),
      ];

      patterns2.forEach((pattern) => {
        const matches = [...content.matchAll(pattern)];
        matches.forEach((match) => {
          regexMatches.push(
            `${pkgName}@${version}\n   - matched text:\n     <start>\n${match[0]}\n     <end>`,
          );
        });
      });
    });
  }
});

console.log(`🔒 Lockfile path: "${lockfilePath}"\n`);

if (structuredMatches.length > 0 || regexMatches.length > 0) {
  console.error("🚫 Banned dependencies found in 'pnpm-lock.yaml':\n");

  structuredMatches.forEach((m) => {
    console.error(` - ${m}\n`);
  });
  regexMatches.forEach((m) => {
    console.error(` - ${m}\n`);
  });

  console.error('❗ Please remove ❌ or override 🔄 these versions!\n');
  process.exit(1);
} else {
  console.log('✅ Lockfile is clean -- no banned versions found!\n');
}
