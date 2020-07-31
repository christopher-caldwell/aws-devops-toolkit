const testForIndexTs = `class MockClient {}

jest.mock('pg', () => {
  return {
    Client: MockClient,
  }
})

import PgClient from '../../src/db'

describe('Importing pool for DB', () => {
  test('The default export is an instance of a Pool class', () => {
    expect(PgClient).toBeInstanceOf(MockClient)
  })
})
`
const testForIndexJs = `class MockClient {}

jest.mock('pg', () => {
  return {
    Client: MockClient,
  }
})

const PgClient = require('../../src/db')

describe('Importing pool for DB', () => {
  test('The default export is an instance of a Pool class', () => {
    expect(PgClient).toBeInstanceOf(MockClient)
  })
})
`

export default (isUsingTypeScript: boolean): string => (isUsingTypeScript ? testForIndexTs : testForIndexJs)
