/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  publicPath: process.env.NODE_ENV === '/'
}
