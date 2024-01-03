const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const glob = require('glob');

const RegName = /(?<=.*\/docs\/).*/;
const RegPath = /(?<=.*\/docs\/).*/;

class ConsoleLogOnBuildWebpackPlugin {
  apply(compiler) {
    compiler.hooks.watchRun.tap('MyPlugin', () => {
      const fileJSON = [];
      const files = glob.sync(path.join(__dirname, '../docs/*'));

      files.forEach((filePath) => {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const matterData = matter(fileContent).data || {};
        const componentTotalName = filePath.match(RegName)[0];
        const componentName = componentTotalName.slice(0, componentTotalName.length - 3);
        const componentPath = filePath.match(RegPath)[0];
        const routePath = `/${componentName.toLocaleLowerCase()}`;

        fileJSON.push({
          ...matterData,
          componentName,
          componentPath,
          routePath,
        });
      });
      const dataJSON = `{"data":${JSON.stringify(fileJSON, null, 2)}}`;
      const dataPath = path.resolve(__dirname, `../router/data.json`);

      fs.writeFile(dataPath, dataJSON, (err) => {
        console.log('Data update success');
        if (err) {
          console.error(err);
          return;
        }
      });
    });
  }
}

module.exports = ConsoleLogOnBuildWebpackPlugin;
