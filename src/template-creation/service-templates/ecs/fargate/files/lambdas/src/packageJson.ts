const packageJsonForJs = `{
  "name": "initiator",
  "version": "1.0.0",
  "description": "Initiator function for Fargate task",
  "main": "index.js",
  "scripts": {
    "test": "jest --config jest.config.js",
    "test:coverage": "jest --config jest.config.js --coverage"
  },
  "private": true,
  "devDependencies": {
    "@babel/core": "^7.9.0",
    "@babel/preset-env": "^7.9.5",
    "babel-jest": "^26.0.1",
    "jest": "^26.0.1"
  },
  "dependencies": {
    "common-aws-actions": "0.0.11",
    "@ihm-software/fargate-task-initiation": "0.0.3"
  }
}
`

const packageJsonForTs = `{
  "name": "initiator",
  "version": "1.0.0",
  "description": "Initiator function for Fargate task",
  "main": "index.js",
  "scripts": {
    "test": "jest --config jest.config.js",
    "test:coverage": "jest --config jest.config.js --coverage"
  },
  "private": true,
  "devDependencies": {
    "@babel/core": "^7.9.0",
    "@babel/preset-env": "^7.9.5",
    "@types/jest": "^26.0.0",
    "jest": "^26.0.1",
    "ts-jest": "^26.1.1",
    "typescript": "^3.9.5"
  },
  "dependencies": {
    "common-aws-actions": "0.0.11",
    "@ihm-software/fargate-task-initiation": "0.0.3"
  }
}
`

export default (isUsingTypeScript: boolean): string => (isUsingTypeScript ? packageJsonForTs : packageJsonForJs)
