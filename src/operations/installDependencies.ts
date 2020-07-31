import path from 'path'
import fs from 'fs'
import childProcess from 'child_process'

import logger from '@/util/'

const executeCommand = (pathToExecuteCommand: string, commandToExec: string): void => {
  childProcess.execSync(commandToExec, { cwd: pathToExecuteCommand, env: process.env, stdio: 'inherit' })
}

const listSubFolders = (targetFolder: string): string[] => {
  return fs
    .readdirSync(targetFolder)
    .filter((subFolder) => fs.statSync(path.join(targetFolder, subFolder)).isDirectory())
    .filter((subFolder) => subFolder !== 'node_modules' && subFolder[0] !== '.')
    .map((subFolder) => path.join(targetFolder, subFolder))
}

const runCommandRecursive = (rootPath: string, targetFolder: string, commandToExecute: string): void => {
  const hasPackageJson = fs.existsSync(path.join(targetFolder, 'package.json'))

  if (hasPackageJson) {
    logger.info('===================================================================')
    logger.info(`Performing "${commandToExecute}" inside ${path.relative(rootPath, targetFolder)}/`)
    logger.info('===================================================================')

    executeCommand(targetFolder, commandToExecute)
  }
  const subFolders = listSubFolders(targetFolder)
  subFolders.forEach((subFolder) => {
    runCommandRecursive(rootPath, subFolder, commandToExecute)
  })
}

/**
 * Executes a command in every folder that has a package.json file.
 * @param commandToExec
 * @param relativePathFromCallingLocation This is the path relative to where in the file tree this will be executed
 */
const main = (commandToExec: string, relativePathFromCallingLocation: string): void => {
  const rootPath = path.resolve(process.cwd(), relativePathFromCallingLocation)
  runCommandRecursive(rootPath, rootPath, commandToExec)
}

export default main
