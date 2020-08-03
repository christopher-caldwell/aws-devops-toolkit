const jsOnEndHandler = `const { logger } = require('@ihm-software/etl-job-helpers')

/**
 * End handler function that will be called after the library is done executing.
 */
const onEndHandler = () => {
  logger.info('I am done now')
}

module.exports = onEndHandler
`

const tsOnEndHandler = `import { logger } from '@ihm-software/etl-job-helpers'

/**
 * End handler function that will be called after the library is done executing.
 */
const onEndHandler = () => {
  logger.info('I am done now')
}

export default onEndHandler
`

export default (isUsingTypeScript: boolean): string => (isUsingTypeScript ? tsOnEndHandler : jsOnEndHandler)
