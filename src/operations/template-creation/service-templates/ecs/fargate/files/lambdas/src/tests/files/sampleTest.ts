export default `import { handler } from '../..'

describe("It doesn't blow up", () => {
  test('I can import the handler function', () => {
    expect(handler).toBeTruthy()
  })
})
`
