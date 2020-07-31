// import childProcess from 'child_process'
import colors from 'colors'

import templateCreation from '@/template-creation/'
import { OperationFunctionMap } from '@/interfaces'
import commander from './setup/commander'


const functionMap: OperationFunctionMap = {
  'template-creation': templateCreation,
}

/**
 * Collects data from various sources and returns it in the expected DynamoDB format
 */
const collectSourceData = async (DbClient: PoolClient, dataSourceArgs: DataSourceArgs) => {
  const functionToExecute = dataSourceArgs.dataSource
  return await functionMap[functionToExecute](DbClient, dataSourceArgs)
}

export default collectSourceData

const main = async () => {
  try {
    const actions = commander()
    console.log('actions', actions)
  } catch (error) {
    console.error(colors.red('An error occurred.'), error)
  }
}

main()
