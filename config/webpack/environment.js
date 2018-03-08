const { environment } = require('@rails/webpacker')
const typescript =  require('./loaders/typescript')

environment.loaders.append('typescript', typescript)
// module.exports = environment

// const { environment } = require('@Rails/webpacker')

/*environment.loaders.set('html', {
  test: /\.html$/,
  exclude: /node_modules/,
  loaders: ['html-loader'] 
})*/

environment.loaders.append('html', {
  test: /\.html$/,
  use: [{
    loader: 'html-loader',
    options: {
      minimize: true,
      removeAttributeQuotes: false,
      caseSensitive: true,
      customAttrSurround: [ [/#/, /(?:)/], [/\*/, /(?:)/], [/\[?\(?/, /(?:)/] ],
      customAttrAssign: [ /\)?\]?=/ ]
    }
  }]
})

module.exports = environment
