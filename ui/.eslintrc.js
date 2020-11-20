module.exports = {
    root: true,
    settings: {
      'import/resolver': {
        webpack: {
          config: 'node_modules/@vue/cli-service/webpack.config.js'
        }
      }
    },
    env: {
      node: true
    },
    extends: [
      'plugin:vue/recommended',
      '@vue/airbnb'
    ],
    rules: {
      'import/extensions': ['error', 'always', {
        js: 'never'
      }],
      'no-alert': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'global-require': 'off',
      'no-underscore-dangle': 'off',
      'no-mixed-operators': 'off',
      'prefer-template': 'off',
      'no-restricted-syntax': 'off',
      'no-continue': 'off',
      'max-len': [0, 80, 4],
      'import/no-extraneous-dependencies': 'off',
      'no-param-reassign': 'off',
      'vue/no-parsing-error': ['error', { 'x-invalid-end-tag': false }],
      'vue/no-v-html': 'off',
      'vue/component-name-in-template-casing': 'off',
      'object-curly-newline': 'off',
      semi: ['error', 'never'],
      'comma-dangle': ['error', 'never'],
      'no-plusplus': 'off',
      'no-bitwise': 'off',
      'space-before-function-paren': ['error', 'always'],
      'linebreak-style': ['error', 'unix']
    },
    parserOptions: {
      parser: 'babel-eslint'
    }
  }
  