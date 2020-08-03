import fs from 'fs-extra'
import path from 'path'

import writeScripts from './scripts'
import writeSrc from './src'
import writeWebpack from './webpack'
import writeTests from './tests'
import localEnv from './utility-files/localEnv'
import dockerfile from './utility-files/docker'
import generatePackageJson from './utility-files/packageJson'
import readme from './utility-files/readme'
import tsconfig from './utility-files/tsconfig'

const createContainerFolder = (filePath: string, isUsingTypeScript: boolean): void => {
  fs.mkdirSync(filePath + '/container')
  const targetFilePath = path.resolve(filePath + '/container')

  // write scripts/
  writeScripts(targetFilePath)

  // write src/
  writeSrc(targetFilePath, isUsingTypeScript)

  // write tests/
  writeTests(targetFilePath, isUsingTypeScript)

  // write webpack/
  writeWebpack(targetFilePath, isUsingTypeScript)

  // write .env.local
  fs.writeFileSync(targetFilePath + '/.env.local', localEnv)

  // write Dockerfile
  fs.writeFileSync(targetFilePath + '/Dockerfile', dockerfile)

  // write package.json
  const packageJson = generatePackageJson(isUsingTypeScript)
  fs.writeFileSync(targetFilePath + '/package.json', packageJson)

  // write README.md
  fs.writeFileSync(targetFilePath + '/README.md', readme)

  // write tsconfig
  if (isUsingTypeScript) {
    fs.writeFileSync(targetFilePath + '/tsconfig.json', tsconfig)
  }
}

export default createContainerFolder
