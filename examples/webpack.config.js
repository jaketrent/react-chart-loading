const fs = require('fs')
const path = require('path')
const postcss = require('postcss')
const postcssCssnext = require('postcss-cssnext')
// const postcssImport = require('postcss-import')
// const postcssUrl = require('postcss-url')
const webpack = require('webpack')

console.log("path.join(__dirname, '..', 'src')", path.join(__dirname, '..', 'src'))

module.exports = {

  devtool: 'inline-source-map',

  entry: ['./examples/index.js'],

  output: {
    path: __dirname + '/dist',
    filename: 'index.js',
    publicPath: '/static/'
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
      { test: /\.css$/, loaders: ['style', 'css?modules&localIdentName=[local]---[hash:base64:5]'] }
    ]
  },

  resolve: {
    alias: {
      'react-chart-loading': path.join(__dirname, '..', 'src')
    }
  },

  postcss: [
    // postcssImport,
    // postcssUrl({ url: url => url }),
    postcssCssnext
  ]

}
