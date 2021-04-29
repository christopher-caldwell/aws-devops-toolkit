const slackOptionsForTs = `import numeral from 'numeral'

const formatNumber = (numberToFormat: number): string => numeral(numberToFormat).format('0,0')

/**
 * Here is where your options for slack messages go.
 * You will need to manually construct them, meaning if your job failed at point 3
 * You need to include point 1 and 2 while saying 3 failed. The library will take whatever exists at the given Key.
 *
 */

const connectionSuccessText = ':white_check_mark:  Connected to DB'

// Here, the slack message will contain both the connection success, and query failures
const sampleQueryFailureText = \`
\${connectionSuccessText}

:x:  Operation failed at querying something
\`

const noErrorSuccessText = (numberOfRowsCounted: number): string => \`
\${connectionSuccessText}

:white_check_mark:  Successfully counted \${formatNumber(numberOfRowsCounted)} rows
\`

export const generateOptionsForSlackMessage = (numberOfRowsCounted: number): { [key: string]: string } => ({
  connection: ':x:  Operation failed at the DB connection',
  sampleQuery: sampleQueryFailureText,
  noError: noErrorSuccessText(numberOfRowsCounted),
})
`

const slackOptionsForJs = `const numeral = require('numeral')

const formatNumber = numberToFormat => numeral(numberToFormat).format('0,0')

/**
 * Here is where your options for slack messages go.
 * You will need to manually construct them, meaning if your job failed at point 3
 * You need to include point 1 and 2 while saying 3 failed. The library will take whatever exists at the given Key.
 *
 */

const connectionSuccessText = ':white_check_mark:  Connected to DB'

// Here, the slack message will contain both the connection success, and query failures
const sampleQueryFailureText = \`
\${connectionSuccessText}

:x:  Operation failed at querying something
\`

const noErrorSuccessText = numberOfRowsCounted => \`
\${connectionSuccessText}

:white_check_mark:  Successfully counted \${formatNumber(numberOfRowsCounted)} rows
\`

module.exports = numberOfRowsCounted => ({
  connection: ':x:  Operation failed at the DB connection',
  sampleQuery: sampleQueryFailureText,
  noError: noErrorSuccessText(numberOfRowsCounted),
})
`

export default (isUsingTypeScript: boolean): string => (isUsingTypeScript ? slackOptionsForTs : slackOptionsForJs)
