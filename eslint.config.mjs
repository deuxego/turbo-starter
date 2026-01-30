import config from '@repo/eslint-config'

// Root config only lints repo-root files. Each package has its own eslint.config.mjs
// extending @repo/eslint-config; Turbo runs lint per package.
export default config({
  ignores: [
    'packages/**',
    'apps/**',
    '**/node_modules/**',
    '**/dist/**',
    '**/build/**',
    '**/.turbo/**',
    '**/coverage/**',
    'pnpm-lock.yaml',
    '*.config.cjs',
  ],
})
