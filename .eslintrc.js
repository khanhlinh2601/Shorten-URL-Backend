module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: ['prettier', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    allowImportEverywhere: false,
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        printWidth: 100,
        tabWidth: 2,
        bracketSpacing: true,
        trailingComma: 'all',
        jsxBracketSameLine: false,
        arrowParens: 'always',
        singleQuote: true,
        semi: true,
        endOfLine: 'auto',
        importOrder: ['^[a-z\\-/]*$', '(^[src/]*$|^[./]|^[../])', ''],
        importOrderSeparation: true,
      },
    ],
    'no-console': 'warn',
    'no-eval': 'warn',
    'no-proto': 2,
    'no-var': 'error',
    'no-unused-vars': 'off',
    'no-duplicate-imports': 'error',
    'no-array-constructor': 'error',
    'prefer-object-spread': 'warn',
    'array-callback-return': 'warn',
    'object-curly-newline': [
      'error',
      {
        ObjectExpression: 'always',
        ObjectPattern: {
          multiline: true,
        },
        ImportDeclaration: 'never',
        ExportDeclaration: {
          multiline: true,
          minProperties: 1,
        },
      },
    ],
    'prefer-destructuring': 'warn',
    'prefer-template': 'warn',
    'template-curly-spacing': ['error', 'never'],
    'object-shorthand': ['error', 'always'],
  },
};
