import { config as baseConfig } from './base.mjs'

/**
 * @param {import('@antfu/eslint-config').OptionsConfig & Omit<import('@antfu/eslint-config').TypedFlatConfigItem, "files">} options
 */
export function config(options = {}) {
  return baseConfig({
    ...options,
    react: true,
  })
}

export default config()