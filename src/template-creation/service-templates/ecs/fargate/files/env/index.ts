import fs from 'fs-extra'
import path from 'path'

import { generateEnv, EnvFileCreationArgs } from './files/env'

const createEnvFolder = (envArgs: EnvFileCreationArgs): void => {
  fs.mkdirSync(envArgs.filePath + '/env')
  const targetFilePath = path.resolve(envArgs.filePath + '/env')

  // write dev
  const devEnv = generateEnv(envArgs, 'dev')
  fs.writeFileSync(targetFilePath + '/.env.dev', devEnv)

  // write qa
  const qaEnv = generateEnv(envArgs, 'qa')
  fs.writeFileSync(targetFilePath + '/.env.qa', qaEnv)

  // write prod
  const prodEnv = generateEnv(envArgs, 'prod')
  fs.writeFileSync(targetFilePath + '/.env.prod', prodEnv)
}

export default createEnvFolder
