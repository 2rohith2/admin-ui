module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  extends: [
    'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
    'plugin:@typescript-eslint/recommended' // Uses the recommended rules from @typescript-eslint/eslint-plugin
  ],
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true // Allows for the parsing of JSX
    }
  },
  'plugins': [
    'react-hooks'
  ],
  rules: {
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/indent': ['error', 2],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/quotes': ['error', 'single'],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/semi': ['error'],
    'semi': 'off',
    'jsx-quotes': ['error', 'prefer-single'],
    'no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 0 }],
    'quotes': 'off',
    'react-hooks/exhaustive-deps': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'semi': 'off'
  },
  'overrides': [
    {
      // enable the rule specifically for TypeScript files
      'files': ['*.ts', '*.tsx'],
      'rules': {
        '@typescript-eslint/explicit-function-return-type': ['error']
      }
    }
  ],
  settings: {
    react: {
      version: 'detect' // Tells eslint-plugin-react to automatically detect the version of React to use
    }
  }
};