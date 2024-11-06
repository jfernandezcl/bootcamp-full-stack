import { defineConfig } from 'eslint-define-config';

export default defineConfig([
  {
    languageOptions: {
      ecmaVersion: 12,
      sourceType: 'module',
      globals: {

      },
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'off',
      'no-undef': 'warn',
    },
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2021,
      },
    },
  },
]);
