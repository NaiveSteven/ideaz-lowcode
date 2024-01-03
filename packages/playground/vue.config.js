
const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  outputDir: path.resolve(__dirname, '../../dist/playground'),
  configureWebpack: (config) => {
    const conf = {
      resolve: {
        alias: {
          '@': resolve('src'),
          '@ideal-schema/shared': resolve('../shared/src'),
          '@ideal-schema/ideal-ui-v3': resolve('../ideal-ui-v3/src'),
        },
      },
    };
    return conf;
  },
};
