const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  // inject: 'body'
});

module.exports = {
  entry: './src/index.html',
  output: {
    path: path.resolve('dist'),
    filename: 'index_bundle.js'
  },
  module: {
    loaders: [
      { 
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        // query: {
        //     presets: ['babel-preset-env', 'es2015']
        // } 
      },
      { 
        test: /\.html/, 
        loader: 'file?name=[name].[ext]' ,
        exclude: /node_modules/,
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.html'],
  },
  plugins: [HtmlWebpackPluginConfig]
}