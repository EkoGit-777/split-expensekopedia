/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
  },
  plugins: ['vue'],
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'vue/multi-word-component-names': 'off',
    'vue/html-closing-bracket-newline': 0,
    'vue/html-closing-bracket-spacing': 0,
    'vue/singleline-html-element-content-newline': 0,
    'vue/html-self-closing': ['warn', {
      'html': { normal: 'never', component: 'always' },
    }],
    'vue/max-attributes-per-line': ['warn', {
      'singleline': {
        'max': 3,
      },
      'multiline': {
        'max': 1,
      },
    }],
    'vue/no-reserved-props': ['error', {
      'vueVersion': 3, // or 2
    }],

    'brace-style': 'warn', // [1tbs default, stroustrup, allman]
    'comma-dangle': ['warn', 'always-multiline'],
    'indent': ['warn', 2],
    'no-unused-vars': 1,
    'quotes': ['warn', 'single', { avoidEscape: true }],
    'semi': ['warn', 'never'],

    'array-bracket-spacing': ['warn', 'never'],
    'comma-spacing': ['warn', { before: false, after: true }],
    'key-spacing': ['warn'],
    'keyword-spacing': ['warn'],
    'no-multi-spaces': ['warn'],
    'no-trailing-spaces': ['warn'],
    'object-curly-spacing': ['warn', 'always'],
    'space-before-function-paren': ['warn', 'always'],
    'space-before-blocks': 'warn',
    'space-infix-ops': ['warn'],
    'space-in-parens': ['warn', 'never'],
  },
  globals: {
    process: true,
  },
}
