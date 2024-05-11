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

    'import/prefer-default-export': 0,
    'import/no-unresolved': 0,
    'import/namespace': 0,
    'import/named': 0,
    'import/default': 0,
    'import/no-duplicates': 0,
    'import/no-named-as-default': 0,
    'import/no-named-as-default-member': 0,

    'react/react-in-jsx-scope': 0,

    'tailwindcss/no-custom-classname': 0,
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
