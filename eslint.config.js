import js from '@eslint/js';
import globals from 'globals';

import prettier from 'eslint-plugin-prettier';

export default [
    js.configs.recommended,
    {
        files: ['resources/**/*.js', 'slides/**/*.js', 'snippets/**/*.js', 'shared/init.js', 'service-worker.js'],
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
