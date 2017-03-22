const { resolve } = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
                loader: 'babel-loader',
                query: { presets: ['es2015', 'react'] }
            }]
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
          publicPath: '/'
        })
      }, 
      {
        test: /\.(jpe?g|png|svg)$/,
        loader: 'file-loader'
      }
    ]
  },
  devServer: {
    contentBase: resolve(__dirname, 'dist'),
    compress: true,
    stats: "errors-only",
    open: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      // hash: true,
      inject: 'body'
    }),
    new ExtractTextPlugin('style.css')
  ]
};

process.noDeprecation = true;
