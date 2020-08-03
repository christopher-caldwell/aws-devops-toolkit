const jestConfigContainerForTs = `module.exports = {
  transform: {
    '^.+.ts?$': 'ts-jest',
  },
  testMatch: ['**/*.spec.(js|ts)'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  moduleFileExtensions: ['js', 'ts', 'json'],
  // coverageThreshold: {
  //   global: {
  //     branches: 90,
  //     functions: 95,
  //     lines: 95,
  //     statements: 95,
  //   },
  // },
  coverageReporters: ['json-summary', 'text'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,ts}'],
  coveragePathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/tests/'],
  testEnvironment: 'node',
  globalSetup: './tests/globalSetup.js',
}
`
const jestConfigContainerForJs = `module.exports = {
  testMatch: ['**/*.spec.(js|ts)'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  moduleFileExtensions: ['js', 'ts', 'json'],
  // coverageThreshold: {
  //   global: {
  //     branches: 90,
  //     functions: 95,
  //     lines: 95,
  //     statements: 95,
  //   },
  // },
  coverageReporters: ['json-summary', 'text'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,ts}'],
  coveragePathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/tests/'],
  testEnvironment: 'node',
  globalSetup: './tests/globalSetup.js',
}
`

export default (isUsingTypeScript: boolean): string => (isUsingTypeScript ? jestConfigContainerForTs : jestConfigContainerForJs)
