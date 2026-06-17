import js from '@eslint/js'
import globals from 'globals'

export default [
    js.configs.recommended,
    {
        languageOptions: {
            ecmaVersion: 2018,
            sourceType: 'commonjs',
            globals: {
                ...globals.node,
                ...globals.es2017,
                Atomics: 'readonly',
                SharedArrayBuffer: 'readonly',
                it: 'writable',
                describe: 'writable',
            },
        },
        rules: {
            // Google style
            'no-var': 'error',
            'prefer-const': 'error',
            'eqeqeq': ['error', 'always'],
            'no-console': 'off',
            'semi': ['error', 'always'],
            'quotes': ['error', 'single', { avoidEscape: true }],
            'no-trailing-spaces': 'error',
            'eol-last': ['error', 'always'],
            'comma-dangle': ['error', 'always-multiline'],
            'keyword-spacing': ['error', { before: true, after: true }],
            'space-before-function-paren': ['error', 'never'],
            'object-curly-spacing': ['error', 'always'],
            'arrow-parens': ['error', 'always'],
            // Project-specific
            'max-len': ['error', { code: 120 }],
            'indent': ['error', 4],
        },
    },
]
