import fs from 'fs-extra'
import path from 'path'

import generateIndex from './files/slackMessageOptions'

const createSrcFolder = (filePath: string, isUsingTypeScript: boolean): void => {
  fs.mkdirSync(filePath + '/slack')
  const targetFilePath = path.resolve(process.cwd(), filePath + '/slack')

  // write sendSlackMessage
  const index = generateIndex(isUsingTypeScript)
  fs.writeFileSync(targetFilePath + `/index.${isUsingTypeScript ? 'ts' : 'js'}`, index)

}

export default createSrcFolder
