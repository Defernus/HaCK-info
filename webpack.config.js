const path = require('path');
const fs = require("fs").promises;

class PackHaCK {
  static packHaCKName = "PackHaCK";
  static defaultOptions = {
    outputFile: 'assets.md',
  };

  constructor(options = {}) {
    this.options = { ...PackHaCK.defaultOptions, ...options };
  }

  apply(compiler) {
    const pluginName = PackHaCK.name;
    compiler.hooks.afterDone.tap(pluginName, async () => {
      const sources = await fs.readFile(
        path.join(compiler.outputPath, "main"),
        { encoding: "utf8" },
      );
      const resultDir = path.join(compiler.outputPath, "result");
      await fs.rm(resultDir, { recursive: true, force: true });

      await fs.cp(path.resolve("./public"), resultDir, { recursive: true });

      const mainFilePath = path.join(resultDir, "main.js");
      const main = await fs.readFile(
        mainFilePath,
        { encoding: "utf8" },
      );

      await fs.writeFile(mainFilePath, `const SOURCES=${JSON.stringify(sources)};\n${main}`);
    });
  }
}

module.exports = {
  entry: './src/index.js',
  mode: 'production',
  output: {
    filename: '[name]',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new PackHaCK(),
  ]
};