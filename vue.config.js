module.exports = {
  productionSourceMap: false,
  devServer: {
    proxy: {
      '/api': {
          target:'http://api.vue.5656dh.com/api'
      }
    }
  }
}