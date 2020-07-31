import fs from 'fs-extra'
import path from 'path'

import babelrc from './files/babelrc'
import eslintrc from './files/eslintrc'
import generateJestConfig from './files/jestConfig'
import sampleTest from './files/sampleTest'
import globalSetup from './files/globalSetup'

const createTestFolder = (filePath: string, isUsingTypeScript: boolean): void => {
  fs.mkdirSync(filePath + '/tests')
  const targetFilePath = path.resolve(process.cwd(), filePath + '/tests')
  fs.mkdirSync(targetFilePath + '/main')

  // write test config
  const jestConfig = generateJestConfig(isUsingTypeScript)
  fs.writeFileSync(filePath + '/jest.config.js', jestConfig)

  // write test setup
  fs.writeFileSync(targetFilePath + '/globalSetup.js', globalSetup)

  // write .babelrc
  fs.writeFileSync(targetFilePath + '/.babelrc', babelrc)

  // write eslintrc
  fs.writeFileSync(targetFilePath + '/.eslintrc', eslintrc)

  // write test
  fs.writeFileSync(targetFilePath + `/main/index.spec.${isUsingTypeScript ? 'ts' : 'js'}`, sampleTest)
}

export default createTestFolder
