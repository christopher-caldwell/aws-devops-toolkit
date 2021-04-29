import fs from 'fs-extra'
import path from 'path'

import eslintrc from '@/service-templates/ecs/fargate/files/lambdas/src/tests/files/eslintrc'
import generateJestConfig from './jestConfig'
import globalSetup from './globalSetup'
import generateDbTests from './db'

const createTestsFolder = (filePath: string, isUsingTypeScript: boolean): void => {
  fs.mkdirSync(filePath + '/tests')
  const targetFilePath = path.resolve(process.cwd(), filePath + '/tests')

  // write jest.config.js
  const jestConfig = generateJestConfig(isUsingTypeScript)
  fs.writeFileSync(filePath + '/jest.config.js', jestConfig)

  // write globalSetup.js
  fs.writeFileSync(targetFilePath + '/globalSetup.js', globalSetup)

  // write .eslintrc
  fs.writeFileSync(targetFilePath + '/.eslintrc', eslintrc)

  // write db/
  generateDbTests(targetFilePath, isUsingTypeScript)
}

export default createTestsFolder
