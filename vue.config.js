const path = require('path')

module.exports = {
  chainWebpack: config => {
    const ofs = ['vue-modules', 'vue', 'normal-modules', 'normal']
    const cssRules = config.module.rule('css')
    const postRules = config.module.rule('postcss')

    const addSassResourcesLoader = (rules, type) => {
      rules
        .oneOf(type)
        .use('sass-resoureces-loader')
        .loader('sass-resources-loader')
        .options({
          resources: [path.resolve(__dirname, './src/assets/variables.scss')]
        })
    }
    ofs.forEach(type => {
      addSassResourcesLoader(cssRules, type)
      addSassResourcesLoader(postRules, type)
    })
    return config
  },
  css: {
    loaderOptions: {
      // pass options to sass-loader
      sass: {
        // @/ is an alias to src/
        data: `@import "~@/styles/general.scss";`
      }
    }
  }
}
