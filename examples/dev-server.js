const koa = require('koa')
const mount = require('koa-mount')
const static = require('koa-static')
const webpackDevMiddleware = require('koa-webpack-dev-middleware')
const webpack = require('webpack')

const config = require('./webpack.config')
const port = process.env.PORT || 3001

const app = koa()
app.name = 'react-chart-loading-examples'
app.use(static(__dirname))
app.use(mount('/static', webpackDevMiddleware(webpack(config))))

app.listen(port)
console.log(`Listening on port ${port}...`)
