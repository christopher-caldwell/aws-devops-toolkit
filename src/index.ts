// import childProcess from 'child_process'
import colors from 'colors'

import templateCreation from '@/operations/template-creation'
import recursiveCommand from '@/operations/recursiveCommand'
import { OperationFunctionMap } from '@/interfaces'
import commander from './setup/commander'

const functionMap: OperationFunctionMap = {
  'template-creation': templateCreation,
  'recursive-command': recursiveCommand,
}

/**
 * Runs an operation
 */
const main = async () => {
  try {
    const programArgs = commander()
    await functionMap[programArgs.action](programArgs.flags)
  } catch (error) {
    console.error(colors.red('An error occurred.'), error)
  }
}

main()
