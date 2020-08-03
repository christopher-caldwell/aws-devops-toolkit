const generateWebpackProd = (): string => {
  return `const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer') // eslint-disable-line

module.exports = merge(common, {
  mode: 'production',
  externals: [/^aws-sdk[a-zA-Z/]/],
  plugins: [
    // uncomment to see your bundle analysis
    // new BundleAnalyzerPlugin()
  ]
})
`
}

export default generateWebpackProd()
