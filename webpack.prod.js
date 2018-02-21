const merge = require('webpack-merge');
const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
const common = require('./webpack.common');

module.exports = merge(common, {
  devtool: 'source-map',
  plugins: [
    new UglifyWebpackPlugin({
      sourceMap: true
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
});
