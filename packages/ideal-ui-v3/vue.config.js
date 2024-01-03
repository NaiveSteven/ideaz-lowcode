const path = require('path');
const RoutePlugin = require('./website/config/routePlugin');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  productionSourceMap: false,
  pages: {
    index: {
      entry: 'website/main.js',
      template: 'index.html',
      filename: 'index.html',
    },
  },
  chainWebpack: (config) => {
    config.module
      .rule('md')
      .test(/\.md/)
      .use('vue-loader')
      .loader('vue-loader')
      .options({
        compiler: require('@vue/compiler-sfc'),
      })
      .end()
      .use(path.resolve('website/config/md-loader/index.js'))
      .loader(path.resolve('website/config/md-loader/index.js'));
  },
  configureWebpack: {
    watchOptions: {
      ignored: /website\/router\/data.json/,
    },
    resolve: {
      alias: {
        '@': resolve('src'),
        '@ideal-schema/shared': resolve('../shared/src'),
        '@ideal-schema/ideal-ui-v3': resolve('../ideal-ui-v3/src'),
      },
    },
    plugins: [new RoutePlugin()],
  },
};
