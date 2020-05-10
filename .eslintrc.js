module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  // add your custom rules here
  rules: {
    'nuxt/no-cjs-in-config': 'off',
    'eol-last': 0,
    'comma-dangle': 0,
    'no-multi-spaces': 0,
    'no-trailing-spaces': 0,
    'no-return-assign': 0,
    'arrow-parens': 0
  }
}
