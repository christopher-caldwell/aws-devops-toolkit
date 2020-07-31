/* eslint-disable no-confusing-arrow */
const determineBuildScripts = (isUsingTypeScript: boolean): string => {
  return isUsingTypeScript
    ? `
    "type-check": "tsc --noEmit",`
    : ''
}

const determineTypeScriptDependencies = (isUsingTypeScript: boolean): string => {
  return isUsingTypeScript
    ? `"@babel/cli": "^7.10.1",
    "@babel/core": "^7.10.2",
    "@babel/plugin-transform-modules-commonjs": "^7.10.1",
    "@babel/preset-env": "^7.10.2",
    "@babel/preset-typescript": "^7.10.1",
    "@types/jest": "^26.0.0",
    "@types/node": "^14.0.13",
    "@types/numeral": "^0.0.28",
    "@types/pg": "^7.14.3",
    "babel-loader": "^8.1.0",
    "babel-plugin-add-module-exports": "^1.0.2",
    "babel-plugin-module-resolver": "^4.0.0",
    "concurrently": "^5.1.0",
    "jest": "^26.0.1",
    "nodemon": "^2.0.3",
    "ts-jest": "^26.1.1",
    "ts-loader": "^7.0.5",
    "typescript": "^3.9.5",
    "webpack": "^4.43.0",
    "webpack-bundle-analyzer": "^3.8.0",
    "webpack-cli": "^3.3.11",
    "webpack-merge": "^4.2.2"`
    : `"eslint": "^6.8.0",
    "jest": "^26.0.1",
    "concurrently": "^5.1.0",
    "nodemon": "^2.0.3",
    "webpack": "^4.42.1",
    "webpack-bundle-analyzer": "^3.6.1",
    "webpack-cli": "^3.3.11",
    "webpack-merge": "^4.2.2"`
}

const generatePackageJson = (isUsingTypeScript: boolean): string => {
  const dependencies = determineTypeScriptDependencies(isUsingTypeScript)
  const typeCheck = determineBuildScripts(isUsingTypeScript)
  return `{
  "name": "container",
  "version": "1.0.0",
  "description": "Container job",
  "private": true,
  "scripts": {${typeCheck}
    "build": "webpack --config webpack/webpack.prod.js",
    "build:dev": "webpack --config webpack/webpack.dev.js",
    "dev": ". ./.env.local && concurrently \\"webpack --watch --config webpack/webpack.dev.js\\" \\"nodemon --delay 5 dist/bundle.js\\"",
    "test": "jest --config jest.config.js",
    "test:coverage": "jest --config jest.config.js --coverage"
  },
  "devDependencies": {
    ${dependencies}
  },
  "dependencies": {
    "@ihm-software/etl-job-helpers": "0.0.3",
    "@slack/webhook": "^5.0.3",
    "numeral": "^2.0.6",
    "pg": "^8.2.1",
    "winston": "^3.2.1"
  }
}
`
}

export default generatePackageJson
