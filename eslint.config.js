import js from '@eslint/js';
import n from 'eslint-plugin-n';

export default [
    js.configs.recommended,
    n.configs['flat/recommended'],
    {
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
        },
        rules: {
            'no-console': 'off',
            'no-var': 'error',
            'prefer-const': 'error',
            'eqeqeq': ['error', 'always'],
            'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
            'n/prefer-node-protocol': 'error',
        },
    },
    {
        files: ['test/**/*.js'],
        languageOptions: {
            globals: {
                describe: 'readonly',
                it: 'readonly',
                before: 'readonly',
                after: 'readonly',
                beforeEach: 'readonly',
                afterEach: 'readonly',
            },
        },
    },
];
