var path = require('path')
module.exports = {
  plugins: [{
    name: 'es6'
  },
  {
    name: 'less',
    options: {
      extract: 'never'
    }
  }, 'release'],
  context: path.join(__dirname, 'src'),
  config: {
    exports: [
      './core-video-to-gif.js'
    ],

    modifyWebpackConfig: function (baseConfig) {
      // edit ykit's Webpack configs
      baseConfig.context = path.join(__dirname, 'src')
      // baseConfig.module.loaders.push({
      //   test: /\.tpl$/,
      //   loader: 'art-template'
      // })
      // specify the out path
      baseConfig.output.prd.path = 'dist'
      baseConfig.output.local.path = 'dist'
      // baseConfig.postLoaders = { test: /\.js$/, loader: 'es3ify' }
      return baseConfig
    }
  },

  hooks: {
    beforeCompiling: function (cliParams, webpackConfig) {
      // 在这里可以拿到编译配置 webpackConfig，并进行更改
      console.log('Do something next!')
    }
  },
  commands: []
}
