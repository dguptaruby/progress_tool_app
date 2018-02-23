const { environment } = require('@rails/webpacker')
const typescript =  require('./loaders/typescript')

environment.loaders.append('typescript', typescript)


environment.loaders.set('html', {
  test: /\.html$/,
  exclude: /node_modules/,
  loaders: ['html-loader']
})

module.exports = environment