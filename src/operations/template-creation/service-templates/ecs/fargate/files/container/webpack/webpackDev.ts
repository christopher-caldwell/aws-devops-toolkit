export default `const merge = require('webpack-merge')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer') // eslint-disable-line
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  plugins: [
    // uncomment to see your bundle analysis
    // new BundleAnalyzerPlugin()
  ]
})
`
