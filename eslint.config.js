import eslint from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import jestPlugin from 'eslint-plugin-jest';

export default [
    eslint.configs.recommended,
    {
        ignores: ['dist/*', 'coverage/*', 'node_modules/*']
    },
    {
        files: ['**/*.ts'],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                project: './tsconfig.json'
            },
            globals: {
                TextEncoder: true
            }
        },
        plugins: {
            '@typescript-eslint': tseslint,
            jest: jestPlugin
        },
        rules: {
            ...tseslint.configs.recommended.rules,
            '@typescript-eslint/explicit-function-return-type': 'error',
            '@typescript-eslint/no-explicit-any': 'error',
            '@typescript-eslint/no-unused-vars': 'error',
            'no-console': 'warn'
        }
    },
    {
        files: ['test/**/*.ts'],
        languageOptions: {
            globals: {
                ...jestPlugin.environments.globals.globals
            }
        },
        rules: {
            '@typescript-eslint/explicit-function-return-type': 'off'
        }
    }
]; 