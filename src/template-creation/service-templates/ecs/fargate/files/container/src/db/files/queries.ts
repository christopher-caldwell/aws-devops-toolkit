import fs from 'fs-extra'
import path from 'path'

const queryForTs = `export default \`
  select count(*) from dbo."iHRCustomStreamHistory"
\`
`

const queryForJs = `module.exports = \`
  select count(*) from dbo."iHRCustomStreamHistory"
\`
`

const indexForTs = `import sampleQuery from './sampleQuery'

// This way of exporting allows the consumer to just import from the queries/ rather than specific files
export {
  sampleQuery
}
`

const indexForJs = `const sampleQuery = require('./sampleQuery')

// This way of exporting allows the consumer to just import from the queries/ rather than specific files
module.exports = {
  sampleQuery
}
`

const createSrcFolder = (filePath: string, isUsingTypeScript: boolean): void => {
  const queryToWrite = isUsingTypeScript ? queryForTs : queryForJs
  const index = isUsingTypeScript ? indexForTs : indexForJs

  fs.mkdirSync(filePath + '/queries')
  const targetFilePath = path.resolve(process.cwd(), filePath + '/queries')

  // write index
  fs.writeFileSync(targetFilePath + `/index.${isUsingTypeScript ? 'ts' : 'js'}`, index)

  // write query
  fs.writeFileSync(targetFilePath + `/sampleQuery.${isUsingTypeScript ? 'ts' : 'js'}`, queryToWrite)
}

export default createSrcFolder
