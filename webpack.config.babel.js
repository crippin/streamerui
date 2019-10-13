const path = require('path');
const webpack = require('webpack');
const sourcePath = path.join(__dirname, 'src');

const config = {
  entry: [path.resolve(sourcePath, 'index.js')],
  output: {
    path: __dirname,
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.css'],
    modules: [sourcePath, path.resolve(__dirname, 'node_modules'), 'node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
        include: sourcePath,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  optimization: {
    minimize: true,
  },
  mode: 'development',
  performance: {
    maxEntrypointSize: 2120000,
    maxAssetSize: 2120000,
  }
};

module.exports = config;
