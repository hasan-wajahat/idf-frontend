module.exports = {
  env: {
    browser: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    $: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 5,
    sourceType: 'script',
  },
  rules: {
    'no-var': 'off',
    'comma-dangle': 'off',
    'func-names': 'off',
    'object-shorthand': 'off',
    'prefer-arrow-callback': 'off',
    'prefer-template': 'off',
  },
};
