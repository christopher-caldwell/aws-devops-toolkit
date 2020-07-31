// import childProcess from 'child_process'
import colors from 'colors'

import commander from './setup/commander'

const main = async () => {
  try {
    const actions = commander()
    console.log('actions', actions)
  } catch (error) {
    console.error(colors.red('An error occurred.'), error)
  }
}

main()
