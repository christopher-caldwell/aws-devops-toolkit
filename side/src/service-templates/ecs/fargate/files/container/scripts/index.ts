import fs from 'fs-extra'
import path from 'path'

import deployContainer from './deployContainer'

const createScriptsFolder = (filePath: string): void => {
  fs.mkdirSync(filePath + '/scripts')
  const targetFilePath = path.resolve(process.cwd(), filePath + '/scripts')

  // write deploy-container.sh
  fs.writeFileSync(targetFilePath + '/deploy-container.sh', deployContainer)
}

export default createScriptsFolder
