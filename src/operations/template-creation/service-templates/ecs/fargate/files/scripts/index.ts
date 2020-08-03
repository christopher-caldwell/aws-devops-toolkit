import fs from 'fs-extra'
import path from 'path'

import preBuild from './preBuild'
import recursiveDependencyInstall from './recursiveDependencyInstall'

const createScripts = (filePath: string): void => {
  fs.mkdirSync(filePath + '/scripts')
  const targetFilePath = path.resolve(filePath + '/scripts')

  // write pre-build
  fs.writeFileSync(targetFilePath + '/pre-build.sh', preBuild)

  // write installDependencies
  fs.writeFileSync(targetFilePath + '/recursiveDependencyInstall.js', recursiveDependencyInstall)
}

export default createScripts
