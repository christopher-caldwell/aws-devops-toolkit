import fs from 'fs-extra'
import path from 'path'

import generateWebpackCommon from './webpackCommon'
import webpackDev from './webpackDev'
import webpackProd from './webpackProd'

/**
 * Generates a webpack config for the Lambdas
 * @param filePath
 */
const generateWebpack = (filePath: string, isUsingTypeScript: boolean): void => {
  fs.mkdirSync(filePath + '/webpack')
  const targetFilePath = path.resolve(process.cwd(), filePath + '/webpack')

  // write common
  const webpackCommon = generateWebpackCommon(isUsingTypeScript)
  fs.writeFileSync(targetFilePath + '/webpack.common.js', webpackCommon)

  // write dev
  fs.writeFileSync(targetFilePath + '/webpack.dev.js', webpackDev)

  // write prod
  fs.writeFileSync(targetFilePath + '/webpack.prod.js', webpackProd)
}
export default generateWebpack
