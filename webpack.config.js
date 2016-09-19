module.exports = {
  entry: './src/main.js',
  output: {
    devtool: 'source-map',
    filename: 'bundle.js',
    path: './build',
    publicPath: '/build'
  }
}