import path from 'path'
import fs from 'fs'
import childProcess from 'child_process'
import colors from 'colors'

import { RecursiveCommandArgs } from '@/interfaces'

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
    console.log(colors.cyan('==================================================================='))
    console.log(colors.cyan(`Performing "${commandToExecute}" inside ${path.relative(rootPath, targetFolder)}/`))
    console.log(colors.cyan('==================================================================='))

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
const main = async (args?: Record<string, unknown>): Promise<void> => {
  const { filePath, command } = { ...args } as RecursiveCommandArgs
  const rootPath = path.resolve(process.cwd(), filePath)
  runCommandRecursive(rootPath, rootPath, command)
}

export default main
