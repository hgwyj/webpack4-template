const merge = require('webpack-merge');
const webpack = require('webpack');
const baseConfig = require('./webpack.base');

const devConfig = {
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  mode: 'production',
  devServer: {
    contentBase: './dist',
    hot: true,
    port: 8888,
    stats: 'errors-only',
  },
  devtool: 'cheap-source-map',
};
module.exports = merge(baseConfig, devConfig);
