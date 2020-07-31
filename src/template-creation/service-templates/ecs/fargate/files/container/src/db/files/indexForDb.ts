const indexForTs = `import { Client } from 'pg'

const PgClient = new Client()

export default PgClient
`

const indexForJs = `const { Client } = require('pg')

const PgClient = new Client()

module.exports = PgClient
`

export default (isUsingTypeScript: boolean): string => (isUsingTypeScript ? indexForTs : indexForJs)
