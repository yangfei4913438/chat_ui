const path = require("path");
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['simple-import-sort', 'react-refresh'],
  rules: {
    'no-nested-ternary': 0,
    'no-return-assign': 0,
    'no-param-reassign': 0,
    'no-restricted-syntax': 0,
    'no-plusplus': 0,
    'no-console': 0,
    'no-void': 0,
    'no-undef': 0,
    'no-fallthrough': 0,
    'consistent-return': 0,

    'import/prefer-default-export': 0,
    'import/no-unresolved': 0,
    'import/namespace': 0,
    'import/named': 0,
    'import/default': 0,
    'import/no-duplicates': 0,
    'import/no-named-as-default': 0,
    'import/no-named-as-default-member': 0,
    'import/export': 0,

    'react/prop-types': 0,
    'react/function-component-definition': 0,
    'react/react-in-jsx-scope': 0,
    'react/require-default-props': 0,
    'react/jsx-no-constructed-context-values': 0,
    'react/jsx-props-no-spreading': 0,
    'react/no-array-index-key': 0,
    'react/no-unknown-property': 0,
    'react/no-unescaped-entities': 0,
    'react/no-unstable-nested-components': 0,

    'react-hooks/exhaustive-deps': 1,
    'react-refresh/only-export-components': 0,

    'tailwindcss/no-custom-classname': 0,

    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/no-shadow': 0,
    '@typescript-eslint/naming-convention': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-unused-vars': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/ban-types': 0
  },
  settings:{
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {
        project: path.join(__dirname, './tsconfig.json'), // 读取ts配置文件
        alwaysTryTypes: true, // always try to resolve types under
      },
    },
  },
  ignorePatterns: ['dist', '.eslintrc.cjs', '**/*.scss', '**/*.css'],
}
