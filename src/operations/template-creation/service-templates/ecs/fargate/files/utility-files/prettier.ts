const generatePrettierRc = (): string => {
  return `{
  "trailingComma": "es5",
  "tabWidth": 2,
  "printWidth": 120,
  "singleQuote": true,
  "semi": false,
  "arrowParens": "avoid"
}
`
}

export default generatePrettierRc()
