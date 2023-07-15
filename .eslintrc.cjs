module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-recommended',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 2023,
    sourceType: 'module',
    parser: '@typescript-eslint/parser',
    requireConfigFile: false,
  },
  plugins: [
    '@typescript-eslint',
    'vue',
    'simple-import-sort', // https://github.com/lydell/eslint-plugin-simple-import-sort
    'import', // https://github.com/import-js/eslint-plugin-import/
  ],
  rules: {
    // https://eslint.vuejs.org/rules/html-closing-bracket-newline.html
    // html closing bracket will not in a separate line.
    'vue/html-closing-bracket-newline': ['error', {
      'singleline': 'never',
      'multiline': 'never',
    }],
    // https://eslint.vuejs.org/rules/html-self-closing.html
    // never use /> for html tag, always use /> for vue component
    'vue/html-self-closing': ['error', {
      'html': { normal: 'never', component: 'always' },
    }],
    // https://eslint.vuejs.org/rules/max-attributes-per-line.html
    'vue/max-attributes-per-line': ['error', {
      'singleline': 3,
      'multiline': {
        'max': 1,
      },
    }],
    // https://eslint.vuejs.org/rules/script-indent.html
    // allow line folding on <script setup>, need to overrides rules indent to off
    // 'vue/script-indent': ['error', 2, { 'baseIndent': 1 }],
    // https://eslint.vuejs.org/rules/component-name-in-template-casing.html
    // always use kebab case for html tag.
    'vue/component-name-in-template-casing': ['error', 'kebab-case', {
      'registeredComponentsOnly': false,
    }],
    // https://typescript-eslint.io/rules/no-explicit-any/
    '@typescript-eslint/no-explicit-any': 'warn',
    // https://typescript-eslint.io/rules/no-unused-vars/
    '@typescript-eslint/no-unused-vars': 'error',
    // https://typescript-eslint.io/rules/member-delimiter-style/
    '@typescript-eslint/member-delimiter-style': ['error', {
      'multiline': {
        'delimiter': 'comma', // default: 'semi'
      },
      'singleline': {
        'delimiter': 'comma', // default: 'semi'
      },
    }],
    // https://typescript-eslint.io/rules/type-annotation-spacing/
    '@typescript-eslint/type-annotation-spacing': 'error',
    // https://github.com/lydell/eslint-plugin-simple-import-sort
    // sort import lines
    'simple-import-sort/imports': ['error', {
      // remove blank lines between import group
      'groups': [['^\\u0000', '^@?\\w', '^[^.]', '^\\.']],
    }],
    // https://github.com/lydell/eslint-plugin-simple-import-sort
    // sort export lines
    'simple-import-sort/exports': 'error',
    // https://github.com/import-js/eslint-plugin-import/blob/HEAD/docs/rules/first.md
    'import/first': 'error',
    // https://github.com/import-js/eslint-plugin-import/blob/HEAD/docs/rules/newline-after-import.md
    'import/newline-after-import': 'error',
    // https://eslint.org/docs/latest/rules/brace-style
    'brace-style': 'warn', // [1tbs default, stroustrup, allman]
    // https://eslint.org/docs/latest/rules/comma-dangle
    'comma-dangle': ['warn', 'always-multiline'],
    // https://eslint.org/docs/latest/rules/indent
    'indent': ['warn', 2],
    // https://eslint.org/docs/latest/rules/no-unused-vars
    'no-unused-vars': 'off', // turn off when using typescript https://typescript-eslint.io/rules/no-unused-vars/
    // https://eslint.org/docs/latest/rules/quotes
    'quotes': ['warn', 'single', { avoidEscape: true }],
    // https://eslint.org/docs/latest/rules/semi
    'semi': ['warn', 'never'],
    // https://eslint.org/docs/latest/rules/array-bracket-spacing
    'array-bracket-spacing': ['warn', 'never'],
    // https://eslint.org/docs/latest/rules/comma-spacing
    'comma-spacing': ['warn', { before: false, after: true }],
    // https://eslint.org/docs/latest/rules/key-spacing
    'key-spacing': ['warn'],
    // https://eslint.org/docs/latest/rules/keyword-spacing
    'keyword-spacing': ['warn'],
    // https://eslint.org/docs/latest/rules/no-multi-spaces
    'no-multi-spaces': ['warn'],
    // https://eslint.org/docs/latest/rules/no-trailing-spaces
    'no-trailing-spaces': ['warn'],
    // https://eslint.org/docs/latest/rules/object-curly-spacing
    'object-curly-spacing': ['warn', 'always'],
    // https://eslint.org/docs/latest/rules/space-before-function-paren
    'space-before-function-paren': ['warn', 'always'],
    // https://eslint.org/docs/latest/rules/space-before-blocks
    'space-before-blocks': 'warn',
    // https://eslint.org/docs/latest/rules/space-infix-ops
    'space-infix-ops': ['warn'],
    // https://eslint.org/docs/latest/rules/space-in-parens
    'space-in-parens': ['warn', 'never'],
    // https://eslint.org/docs/latest/rules/linebreak-style
    'linebreak-style': ['off'],
  },
  overrides: [
  ],
}