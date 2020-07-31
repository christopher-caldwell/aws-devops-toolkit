const testForDbTs = `import { sampleQuery } from '../../src/db/queries'

describe('Importing queries', () => {
  test('Sample query is a string', () => {
    const typeOfQuery = typeof sampleQuery
    expect(typeOfQuery).toBe('string')
  })
})
`
const testForDbJs = `const { sampleQuery } = require('../../src/db/queries')

describe('Importing queries', () => {
  test('Sample query is a string', () => {
    const typeOfQuery = typeof sampleQuery
    expect(typeOfQuery).toBe('string')
  })
})
`

export default (isUsingTypeScript: boolean): string => (isUsingTypeScript ? testForDbTs : testForDbJs)
