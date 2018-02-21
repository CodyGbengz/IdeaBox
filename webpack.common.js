const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: './client/index.jsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [{
      test: /\.(s*)css$/,
      use: ['style-loader', 'css-loader', 'sass-loader']
    },
    {
      test: /\.(png|jpg|jpeg|gif)$/,
      use: ['file-loader']
    },
    {
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: ['file-loader']
    }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Food Order'
    }),
    new CleanWebpackPlugin(['dist']),
  ]
};
