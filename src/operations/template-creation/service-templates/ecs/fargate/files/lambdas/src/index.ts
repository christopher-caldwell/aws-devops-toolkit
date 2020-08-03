import fs from 'fs-extra'
import path from 'path'

import generateTestFolder from './tests'
import generatePackageJson from './packageJson'
import generateIndexForLambda from './indexForLambda'

const createSrc = (filePath: string, isUsingTypeScript: boolean): void => {
  fs.mkdirSync(filePath + '/src')
  const srcPath = path.resolve(process.cwd(), filePath + '/src')
  fs.mkdirSync(srcPath + '/initiator')
  const targetPath = path.resolve(process.cwd(), filePath + '/src/initiator')

  // write tests
  generateTestFolder(targetPath, isUsingTypeScript)

  // write package.json
  const packageJson = generatePackageJson(isUsingTypeScript)
  fs.writeFileSync(targetPath + '/package.json', packageJson)

  // write index.js
  const index = generateIndexForLambda(isUsingTypeScript)
  fs.writeFileSync(targetPath + `/index.${isUsingTypeScript ? 'ts' : 'js'}`, index)
}

export default createSrc
