var path = require("path");

module.exports = {
  output: {
    path: path.join(__dirname, 'dist'),
    filename: "main.js",
    library: 'EnvLabel',
    libraryTarget: 'window'
  },
  resolve: {
    extensions: ['.ts', '.js'],
    modules: [
      path.join(__dirname, 'src'),
      'node_modules'
    ]
  },
  module: {
    rules: [
      { test: /\.ts/, exclude: /node_modules/, loaders: ['ts-loader']}
    ]
  }
};