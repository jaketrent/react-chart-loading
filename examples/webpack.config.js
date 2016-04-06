const fs = require('fs')
const path = require('path')
const postcss = require('postcss')
const postcssCssnext = require('postcss-cssnext')
const webpack = require('webpack')

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
    postcssCssnext
  ]

}
