import { FlatCompat } from '@eslint/eslintrc';
import path from 'path';
import { fileURLToPath } from 'url';

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname, // optional; default: process.cwd()
  resolvePluginsRelativeTo: __dirname, // optional
});

export default [
  ...compat.extends('airbnb-base'),
  ...compat.extends('airbnb-typescript/base'),
  ...compat.extends('plugin:@typescript-eslint/recommended'),
  ...compat.extends('plugin:@typescript-eslint/recommended-requiring-type-checking'),
  {
    files: ['**/*.{js,ts}'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    rules: {
      "import/prefer-default-export": "off", 
      "@typescript-eslint/no-throw-literal": "off",
      "@typescript-eslint/no-misused-promises": "off",
    },
  },
];
