import fs from 'fs-extra'
import path from 'path'

import generateIndex from './files/indexForDb'
import generateQueriesFolder from './files/queries'

const createSrcFolder = (filePath: string, isUsingTypeScript: boolean): void => {
  fs.mkdirSync(filePath + '/db')
  const targetFilePath = path.resolve(process.cwd(), filePath + '/db')

  // write queries
  generateQueriesFolder(targetFilePath, isUsingTypeScript)

  // write index
  const index = generateIndex(isUsingTypeScript)
  fs.writeFileSync(targetFilePath + `/index.${isUsingTypeScript ? 'ts' : 'js'}`, index)
}

export default createSrcFolder
