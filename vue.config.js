const path = require('path')

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        App: path.resolve(__dirname, 'src/')
      },
      extensions: ['*', '.js', '.vue', '.json']
    }
  },
  pwa: {
    name: 'Traders Dash',
    themeColor: '#131722',
    msTileColor: '#FFFFFF',
    background_color: '#131722',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    startUrl: '/?standalone=true'
  }
}
