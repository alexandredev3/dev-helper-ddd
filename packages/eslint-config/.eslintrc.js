module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    "plugin:prettier/recommended"
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'prettier',
    'eslint-plugin-import-helpers'
  ],
  rules: {
    "no-new": "off",
    "no-prototype-builtins": "off",
    "camelcase": "off",
    "no-restricted-syntax": "off",
    "max-classes-per-file": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "no-console": "off",
    "linebreak-style": ["error", process.platform === 'win32' ? 'windows' : 'unix'],
    "import/prefer-default-export": "off",
    "@typescript-eslint/explicit-function-return-type": ["off"],
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        "argsIgnorePattern": "_"
      }
    ],
    "no-useless-constructor": "off",
    "@typescript-eslint/naming-convention": [
      "error",
      {
        "selector": "interface",
        "format": ["PascalCase"],
        "custom": {
          "regex": "^I[A-Z]",
          "match": true
        }
      }
    ],
    "@typescript-eslint/explicit-module-boundary-types": [
      "warn",
      {
        "allowArgumentsExplicitlyTypedAsAny": true
      }
    ],
    "no-underscore-dangle": "off",
    "@typescript-eslint/camelcase": "off",
    "prettier/prettier": "error",
    "class-methods-use-this": "off",
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "ts": "never"
      }
    ],
    // caso voce tenha um diretorio so para testes
    // crie um arquivo .eslintrc.json dentro do diretorio de testes.
    // e adicione o "import/no-extraneous-dependencies".
    "import/no-extraneous-dependencies": [
      "off",
      { "devDependencies": true }
    ],
    "import-helpers/order-imports": [
      "warn",
      {
        "newlinesBetween": "always",
        "groups": [
          "module",
          "/^@server/shared/",
          "/^@/",
          ["parent", "sibling", "index"]
        ],
        "alphabetize": { "order": "asc", "ignoreCase": true }
      }
    ],
  },
  "settings": {
    "import/resolver": {
      "node": {
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      }
    }
  }
};
