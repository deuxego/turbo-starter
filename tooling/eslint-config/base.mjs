import antfu from '@antfu/eslint-config'

/**
 * @param {import('@antfu/eslint-config').OptionsConfig & Omit<import('@antfu/eslint-config').TypedFlatConfigItem, "files">} options
 */
export function config(options = {}) {
  return antfu({
    formatters: true,
    markdown: false, // Exclude markdown files from linting
    ...options,
  })
}

export default config()