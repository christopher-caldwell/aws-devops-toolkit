import fs from 'fs-extra'
import path from 'path'

import generateIndex from './files/indexTest'
import generateDb from './files/db'

const createTestsFolder = (filePath: string, isUsingTypeScript: boolean): void => {
  fs.mkdirSync(filePath + '/db')
  const targetFilePath = path.resolve(process.cwd(), filePath + '/db')

  // write index
  const index = generateIndex(isUsingTypeScript)
  fs.writeFileSync(targetFilePath + `/index.spec.${isUsingTypeScript ? 'ts' : 'js'}`, index)

  // write query
  const dbTest = generateDb(isUsingTypeScript)
  fs.writeFileSync(targetFilePath + `/queries.spec.${isUsingTypeScript ? 'ts' : 'js'}`, dbTest)
}

export default createTestsFolder
