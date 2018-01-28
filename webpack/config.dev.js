const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const paths = require('./paths');

module.exports = {
  entry: paths.entryJs,
  output: {
    path: paths.dist,
    filename: '[name].[chunkhash].js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader'
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.htmlTemplate,
    })
  ],
  devServer: {
    contentBase: paths.dist,
    compress: true,
    port: 4000
  }
};