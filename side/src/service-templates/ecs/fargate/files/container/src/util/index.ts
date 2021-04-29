import fs from 'fs-extra'
import path from 'path'

import generateOnEndHandler from './files/onEndHandler'

const createSrcFolder = (filePath: string, isUsingTypeScript: boolean): void => {
  fs.mkdirSync(filePath + '/util')
  const targetFilePath = path.resolve(process.cwd(), filePath + '/util')

  // write onEndHandler
  const onEndHandler = generateOnEndHandler(isUsingTypeScript)
  fs.writeFileSync(targetFilePath + `/onEndHandler${isUsingTypeScript ? '.ts' : '.js'}`, onEndHandler)
}

export default createSrcFolder
