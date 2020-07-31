import { program } from 'commander'

let determinedAction: string

export interface ProgramArgs {
  action: string
  pathOfTemplate?: string
}

const initializeProgram = (): ProgramArgs => {
  program
    .arguments('<actionToTake>')
    .action((actionToTake: string) => {
      determinedAction = actionToTake
    })
    .version('0.0.1')

  program.parse(process.argv)

  if (!determinedAction) throw new Error('Action not specified')

  return {
    action: determinedAction,
  }
}

export default initializeProgram
