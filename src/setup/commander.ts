import { program } from 'commander'

import { ProgramArgs, OperationFunctionName } from '@/interfaces'

let determinedAction: OperationFunctionName

const initializeProgram = (): ProgramArgs => {
  program
    .arguments('<actionToTake>')
    .action((actionToTake: OperationFunctionName) => {
      determinedAction = actionToTake
    })
    .version('0.0.1')
    .option('--file-path <type>', 'Relative file path to begin the process')
    .option('-c, --command <type>', 'Command that should be executed recursively')

  program.parse(process.argv)

  if (!determinedAction) throw new Error('Action not specified')

  return {
    action: determinedAction,
    flags: program.opts(),
  }
}

export default initializeProgram
