const indexContainerForTs = `import { onEndHandler, logger } from '@ihm-software/etl-job-helpers'
import { OnEndHandlerArgs } from '@ihm-software/etl-job-helpers/dist/lib/onEndHandler'

// queries
import { sampleQuery } from './db/queries'

// utils
import Client from './db'

import { generateOptionsForSlackMessage } from './slack'
import onEndHandlerCallback from './util/onEndHandler'

// configs
let thrownError: Error | undefined = undefined
const startTimeStamp = Date.now()
let operationFailedAt = 'connection'
let numberOfRowsCounted = 0

const executeQuery = async (): Promise<void> => {
  try {
    await Client.connect()
    logger.info('Completed step 1: Connected to DB')
    operationFailedAt = 'query'

    const { rows } = await Client.query(sampleQuery)
    numberOfRowsCounted = rows[0].count

    // The operationFailedAt variable needs to be updated after each successful step.
    // This is the key that will determine what message gets sent in Slack
    // After all of the operations were successful, declare the noError occurred
    operationFailedAt = 'noError'
    logger.info('Completed step 2: Counting rows')
  } catch (error) {
    logger.error('Error caught', error)
    thrownError = error
  } finally {
    const optionsForSlackMessage = generateOptionsForSlackMessage(numberOfRowsCounted)
    const onEndArgs: OnEndHandlerArgs = {
      startTimeStamp,
      thrownError,
      operationFailedAt,
      titleOfMessage: 'My Super Cool ETL Job',
      optionsForSlackMessage,
      userCallback: onEndHandlerCallback,
    }
    await onEndHandler(onEndArgs)
  }
}

executeQuery()
`

const indexContainerForJs = `const { onEndHandler, logger } = require('@ihm-software/etl-job-helpers')

// queries
const { sampleQuery } = require('./db/queries')

// utils
const Client = require('./db')

const generateOptionsForSlackMessage = require('./slack')
const onEndHandlerCallback = require('./util/onEndHandler')

// configs
let thrownError
const startTimeStamp = Date.now()
let operationFailedAt = 'connection'
let numberOfRowsCounted = 0

const executeQuery = async () => {
  try {
    await Client.connect()
    logger.info('Completed step 1: Connected to DB')
    operationFailedAt = 'query'

    const { rows } = await Client.query(sampleQuery)
    numberOfRowsCounted = rows[0].count

    // The operationFailedAt variable needs to be updated after each successful step.
    // This is the key that will determine what message gets sent in Slack
    // After all of the operations were successful, declare the noError occurred
    operationFailedAt = 'noError'
    logger.info('Completed step 2: Counting rows')
  } catch (error) {
    logger.error('Error caught', error)
    thrownError = error
  } finally {
    const optionsForSlackMessage = generateOptionsForSlackMessage(numberOfRowsCounted)
    const onEndArgs = {
      startTimeStamp,
      thrownError,
      operationFailedAt,
      titleOfMessage: 'My Super Cool ETL Job',
      optionsForSlackMessage,
      userCallback: onEndHandlerCallback,
    }
    await onEndHandler(onEndArgs)
  }
}

executeQuery()
`

const generateIndexForContainer = (isUsingTypeScript: boolean): string => {
  return isUsingTypeScript ? indexContainerForTs : indexContainerForJs
}

export default generateIndexForContainer
