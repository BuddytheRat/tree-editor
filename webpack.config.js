module.exports = {
  entry: './src/main.js',
  output: {
    devtool: 'cheap-module-eval=source-map',
    filename: 'bundle.js',
    path: './build',
    publicPath: '/build'
  },
  context: __dirname,
  node: {
    __filename: true,
    __dirname: true
  }
}