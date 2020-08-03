import fs from 'fs-extra'
import path from 'path'

import generateSrc from './src'
import generateWebpack from './webpack'
import readme from './readme'

const createLambdaFolder = (filePath: string, isUsingTypeScript: boolean): void => {
  fs.mkdirSync(filePath + '/lambdas')
  const targetFilePath = path.resolve(filePath + '/lambdas')

  // write src
  generateSrc(targetFilePath, isUsingTypeScript)

  // write webpack
  generateWebpack(targetFilePath, isUsingTypeScript)

  // write README.md
  fs.writeFileSync(targetFilePath + '/README.md', readme)
}

export default createLambdaFolder
