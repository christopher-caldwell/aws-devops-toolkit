const generateEslintRc = () => {
  return `{
  "env": {
    "jest": true
  },
  "parserOptions": {
    "sourceType": "module"
  },
  "rules": {
    "import/no-unresolved": "off"
  }
}
`
}

export default generateEslintRc()
