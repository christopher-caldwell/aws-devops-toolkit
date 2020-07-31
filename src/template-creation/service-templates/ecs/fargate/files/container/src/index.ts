import fs from 'fs-extra'
import path from 'path'

import generateIndex from './indexForContainer'
import generateDbFolder from './db'
import generateUtilFolder from './util'
import generateSlackFolder from './slack'

const createSrcFolder = (filePath: string, isUsingTypeScript: boolean): void => {
  fs.mkdirSync(filePath + '/src')
  const targetFilePath = path.resolve(process.cwd(), filePath + '/src')

  // write db/
  generateDbFolder(targetFilePath, isUsingTypeScript)

  // write util/
  generateUtilFolder(targetFilePath, isUsingTypeScript)

  // write slack/
  generateSlackFolder(targetFilePath, isUsingTypeScript)

  // write index.js
  const index = generateIndex(isUsingTypeScript)
  fs.writeFileSync(targetFilePath + `/index.${isUsingTypeScript ? 'ts' : 'js'}`, index)
}

export default createSrcFolder
