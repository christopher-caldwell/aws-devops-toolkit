const merge = require('webpack-merge')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer') // eslint-disable-line no-unused-vars
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'production',
  externals: {
    ...common.externals,
  },
  plugins: [
    // uncomment to see your bundle analysis
    // new BundleAnalyzerPlugin()
  ],
})
