import js from '@eslint/js';
import globals from 'globals';

import prettier from 'eslint-plugin-prettier';

export default [
    js.configs.recommended,
    {
        files: ['resources/**/*.js', 'slides/**/*.js', 'shared/init.js'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                ...globals.browser,
            },
        },
        plugins: {
            prettier,
        },
        rules: {
            'prettier/prettier': 'warn',
        },
        ignores: ['**/.*', 'node_modules/*', '--help/*', '.husky/*', '.vscode/*', 'images/*'],
    },
];
