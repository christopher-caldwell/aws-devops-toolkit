const webpackCommonForTs = `const path = require('path')
const slsw = require('serverless-webpack')

module.exports = {
  stats: 'minimal',
  context: path.resolve(process.cwd()),
  entry: slsw.lib.entries,
  resolve: {
    extensions: ['.js', '.json', '.ts'],
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(process.cwd(), '.webpack'),
    filename: '[name].js',
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /.ts(x?)$/,
        loader: 'ts-loader',
        options: {},
      },
    ],
  },
}
`

const webpackCommonForJs = `const serverlessWebpack = require('serverless-webpack')

module.exports = {
  entry: serverlessWebpack.lib.entries,
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js']
  },
  stats: 'minimal',
  target: 'node',
}
`

const generateWebpackCommon = (isUsingTypeScript: boolean): string => (isUsingTypeScript ? webpackCommonForTs : webpackCommonForJs)

export default generateWebpackCommon
