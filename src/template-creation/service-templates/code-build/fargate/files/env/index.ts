import fs from 'fs-extra'
import path from 'path'

import generateEnv from './files/env'

const createEnvFolder = (filePath: string, isForMusicLab: boolean, projectName: string): void => {
  fs.mkdirSync(filePath + 'env')
  const targetFilePath = path.resolve(filePath + 'env')

  // write dev
  const devEnv = generateEnv(isForMusicLab, projectName, 'dev')
  fs.writeFileSync(targetFilePath + '/.env.dev', devEnv)

  // write qa
  const qaEnv = generateEnv(isForMusicLab, projectName, 'qa')
  fs.writeFileSync(targetFilePath + '/.env.qa', qaEnv)

  // write prod
  const prodEnv = generateEnv(isForMusicLab, projectName, 'prod')
  fs.writeFileSync(targetFilePath + '/.env.prod', prodEnv)
}

export default createEnvFolder
