module.exports = {
  env: {
    es2020: true,
    node: true,
    jest: true,
  },
  extends: [
    'airbnb-base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'class-methods-use-this': 'off',
    'lines-between-class-members': 'off',
    'no-unused-vars': 'off',
    'no-underscore-dangle': 'off',
    '@typescript-eslint/no-unused-vars': ['warn'],
    'import/extensions': [
      'error', 'ignorePackages', {
        js: 'never',
        ts: 'never',
      },
    ],
    'import/no-extraneous-dependencies': ['error', {
      devDependencies: [
        'src/test/**',
        'src/e2e/**',
      ],
    }],
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
};
