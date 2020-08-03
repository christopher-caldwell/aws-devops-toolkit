const generateGlobalSetup = (): string => {
  return `// Here you can set any env variables you want your tests to have. This will run before the tests.
module.exports = () => {
  process.env.ENV = 'test'
}
`
}

export default generateGlobalSetup()
