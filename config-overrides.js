const { injectBabelPlugin } = require("react-app-rewired");
const WebpackPluginImport = require("webpack-plugin-import");
const rewireSass = require("./rewire-scss");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
// const rewireLess = require('react-app-rewire-less')
// const rewireLess = require('./rewire-less')
const rewireDefinePlugin = require("react-app-rewire-define-plugin");
const rewireWebpackBundleAnalyzer = require("react-app-rewire-webpack-bundle-analyzer");
const path = require("path");
const rewireCssModules = require("react-app-rewire-css-modules");
const rewireLessWithModule = require("react-app-rewire-less-with-modules");
const Jarvis = require("webpack-jarvis");

module.exports = function override(config, env) {
  //   config = injectBabelPlugin(
  //     [
  //       "import",
  //       {
  //         libraryName: "antd",
  //         libraryDirectory: "es",
  //         style: "css"
  //       }
  //     ],
  //     config
  //   );

  // config.module.rules[1].oneOf.push({})

  config.plugins.push(new ProgressBarPlugin());
  config.plugins.push(
    new WebpackPluginImport([
      {
        libraryName: /^@alifd\/next\/lib\/([^/]+)/,
        stylePath: "style.js"
      },
      {
        libraryName: /@icedesign\/.*/,
        stylePath: "style.js"
      }
    ])
  );

  config = injectBabelPlugin(
    [
      "import",
      [
        { libraryName: "antd", style: true },
        { libraryName: "@alifd/next", style: true }
      ]
    ],
    config
  );

  // config = rewireLess(config, env, {
  //   // 需要覆盖的antd主题变量
  //   '@primary-color': '#1DA57A',
  //   '@link-color': '#1DA57A',
  //   '@border-radius-base': '2px',
  //   '@font-size-base': '14px',
  //   '@line-height-base': '1.2',
  //   '@card-actions-background': '#f5f8fa'
  // })
  // config = rewireLess.withLoaderOptions({
  //   javascriptEnabled: true,
  //   modifyVars: { '@primary-color': '#1DA57A' }
  // })(config, env)
  // less局部应用样式依赖方案
  config = rewireLessWithModule(config, env, {
    modifyVars: {
      "@primary-color": "#F1BC74",
      "@link-color": "#20205B",
      "@border-radius-base": "2px",
      "@font-size-base": "16px",
      "@line-height-base": "1.2"
    }
  });

  config = rewireDefinePlugin(config, env, {
    __DEV__: false
  });

  config = rewireSass(config);
  // scss/sass局部应用样式依赖方案
  config = rewireCssModules(config, env);

  // 短路径别名配置
  config.resolve = {
    ...config.resolve,
    alias: {
      // '@': path.resolve(__dirname, 'src'),
      "@node_modules": path.resolve(__dirname, "node_modules"),
      "@api": path.resolve(__dirname, "src/api"),
      "@components": path.resolve(__dirname, "src/components"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@routerConfig": path.resolve(__dirname, "src/routerConfig.jsx"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@routes": path.resolve(__dirname, "src/routes"),
      "@stores": path.resolve(__dirname, "src/stores"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@style": path.resolve(__dirname, "src/style"),
      "@config": path.resolve(__dirname, "src/config")
    }
  };
  // console.log(config.module.rules)
  if (env === "production") {
    config = rewireWebpackBundleAnalyzer(config, env, {
      analyzerMode: "static",
      reportFilename: "report.html"
    });
  } else {
    config.plugins.push(new Jarvis({port: 3006}))
    // config = rewireWebpackBundleAnalyzer(config, env, {
    //   //  可以是`server`，`static`或`disabled`。
    //   //  在`server`模式下，分析器将启动HTTP服务器来显示软件包报告。
    //   //  在“静态”模式下，会生成带有报告的单个HTML文件。
    //   //  在`disabled`模式下，你可以使用这个插件来将`generateStatsFile`设置为`true`来生成Webpack Stats JSON文件。
    //   analyzerMode: "server",
    //   //  将在“服务器”模式下使用的主机启动HTTP服务器。
    //   analyzerHost: "127.0.0.1",
    //   //  将在“服务器”模式下使用的端口启动HTTP服务器。
    //   analyzerPort: 8686,
    //   //  路径捆绑，将在`static`模式下生成的报告文件。
    //   //  相对于捆绑输出目录。
    //   reportFilename: "report.html",
    //   //  模块大小默认显示在报告中。
    //   //  应该是`stat`，`parsed`或者`gzip`中的一个。
    //   //  有关更多信息，请参见“定义”一节。
    //   defaultSizes: "parsed",
    //   //  在默认浏览器中自动打开报告
    //   openAnalyzer: true,
    //   //  如果为true，则Webpack Stats JSON文件将在bundle输出目录中生成
    //   generateStatsFile: false,
    //   //  如果`generateStatsFile`为`true`，将会生成Webpack Stats JSON文件的名字。
    //   //  相对于捆绑输出目录。
    //   statsFilename: "stats.json",
    //   //  stats.toJson（）方法的选项。
    //   //  例如，您可以使用`source：false`选项排除统计文件中模块的来源。
    //   //  在这里查看更多选项：https：  //github.com/webpack/webpack/blob/webpack-1/lib/Stats.js#L21
    //   statsOptions: null
    //   // logLevel: 'info' 日志级别。可以是'信息'，'警告'，'错误'或'沉默'。
    // });
  }

  return config;
};
