import { program } from 'commander'

let destination: string | null = null

const initializeProgram = (): string => {
  program
    .arguments('<givenDestination>')
    .action((givenDestination: string) => {
      destination = givenDestination
    })
    .version('0.0.1')

  program.parse(process.argv)

  if (destination) return destination

  throw new Error('Destination not defined')
}

export default initializeProgram
