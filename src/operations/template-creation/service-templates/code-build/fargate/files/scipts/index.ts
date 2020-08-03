import fs from 'fs-extra'
import path from 'path'

import deploy from './files/deploy'
import deleteStack from './files/delete'

const createScriptsFolder = (filePath: string): void => {
  fs.mkdirSync(filePath + 'scripts')
  const targetFilePath = path.resolve(filePath + 'scripts')

  // write deploy
  fs.writeFileSync(targetFilePath + '/deploy.sh', deploy)

  // write delete
  fs.writeFileSync(targetFilePath + '/delete.sh', deleteStack)
}

export default createScriptsFolder
