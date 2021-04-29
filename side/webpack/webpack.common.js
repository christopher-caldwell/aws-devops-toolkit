const path = require('path')

module.exports = {
  entry: path.resolve(process.cwd(), 'src/index.ts'),
  output: {
    path: path.resolve(process.cwd(), 'dist/'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    node: true,
                  },
                },
              ],
              '@babel/preset-typescript',
            ],
            plugins: [
              'add-module-exports',
              [
                'module-resolver',
                {
                  root: ['./src'],
                  alias: {
                    '@': './src/',
                    '@util': './src/util',
                    '@shared': './src/shared',
                    '@constants': './src/constants',
                  },
                },
              ],
            ],
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
  stats: 'minimal',
  target: 'node',
  resolve: {
    alias: {
      '@': path.resolve(process.cwd(), 'src'),
    },
    extensions: ['.ts', '.js'],
  },
}
