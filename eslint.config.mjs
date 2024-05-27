import globals from 'globals';
import pluginJs from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default [
    pluginJs.configs.recommended,
    eslintPluginPrettierRecommended,
    {
        languageOptions: { globals: globals.browser }
    },
    {
        rules: {
            'no-unused-vars': 'warn',
            'no-undef': 'warn'
        }
    }
];
