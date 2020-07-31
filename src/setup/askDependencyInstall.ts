import colors from 'colors'
import childProcess from 'child_process'
import path from 'path'

import { askQuestions } from '@/setup/askQuestions'
import { willInstallDepArgs } from '@/constants/serviceQuestions'

/**
 * Installs dependencies if the user wishes to
 * @param destinationPath Relative ath in which the commands will be executed
 */
const askToInstallDependencies = async (destinationPath: string): Promise<void> => {
  const willInstall = (await askQuestions(willInstallDepArgs)) as boolean
  if (willInstall) {
    const pathToDestination = path.resolve(process.cwd(), destinationPath)
    console.log(colors.cyan('\nInstalling dependencies. This might be a hot minute.\n'))
    childProcess.execSync('yarn install-dependencies', { cwd: pathToDestination })
  }
}

export default askToInstallDependencies
