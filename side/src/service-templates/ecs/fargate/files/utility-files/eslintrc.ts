const rootEsLintForTs = `{
  "root": true,
  "env": {
    "node": true,
    "es6": true
  },
  "extends": ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 11,
    "sourceType": "module"
  },
  "overrides": [
    {
      "files": ["**/*.js"],
      "rules": {
        "@typescript-eslint/explicit-function-return-type": "off"
      }
    }
  ],
  "plugins": ["@typescript-eslint"],
  "rules": {
    "@typescript-eslint/camelcase": "off",
    "quotes": [
      2,
      "single",
      {
        "avoidEscape": true
      }
    ],
    "array-bracket-spacing": [2, "never"],
    "import/prefer-default-export": "off",
    "@typescript-eslint/no-for-in-array": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/member-delimiter-style": [
      2,
      {
        "multiline": {
          "delimiter": "none",
          "requireLast": true
        }
      }
    ],
    "@typescript-eslint/quotes": [
      2,
      "single",
      {
        "avoidEscape": true
      }
    ],
    "arrow-parens": "off",
    "space-before-blocks": "off",
    "keyword-spacing": "off",
    "object-curly-newline": "off",
    "arrow-body-style": "off",
    "padded-blocks": "off",
    "no-console": "off",
    "semi": [2, "never"],
    "comma-dangle": [0, "always"],
    "import/no-extraneous-dependencies": "off",
    "max-len": [2, 120]
  },
  "ignorePatterns": ["node_modules/", "dist/"]
}
`

const rootEsLintForJs = `{
  "root": true,
  "env": {
    "node": true,
    "es6": true
  },
  "extends": ["eslint:recommended", "airbnb-base"],
  "rules": {
    "no-console": "off",
    "quotes": [2, "single", { "avoidEscape": true }],
    "semi": [2, "never"],
    "comma-dangle": [0, "always"],
    "arrow-parens": "off",
    "import/no-extraneous-dependencies": "off",
    "space-before-blocks": "off",
    "keyword-spacing": "off",
    "object-curly-newline": "off",
    "arrow-body-style": "off",
    "padded-blocks": "off",
    "max-len": [2, 120]
  },
  "ignorePatterns": ["**/node_modules/", "**/bundle.js"],
  "parserOptions": {
    "ecmaVersion": 11
  }
}`

const generateEsLint = (isUsingTypeScript: boolean): string => {
  return isUsingTypeScript ? rootEsLintForTs : rootEsLintForJs
}

export default generateEsLint
