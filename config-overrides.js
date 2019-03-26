const { injectBabelPlugin } = require('react-app-rewired')
const WebpackPluginImport = require('webpack-plugin-import')
const rewireSass = require('./rewire-scss')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
// const rewireLess = require('react-app-rewire-less')
// const rewireLess = require('./rewire-less')
const rewireDefinePlugin = require('react-app-rewire-define-plugin')
const rewireWebpackBundleAnalyzer = require('react-app-rewire-webpack-bundle-analyzer')
const path = require('path')
const rewireCssModules = require('react-app-rewire-css-modules')
const rewireLessWithModule = require('react-app-rewire-less-with-modules')

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

  config.plugins.push(new ProgressBarPlugin())
  config.plugins.push(
    new WebpackPluginImport([
      {
        libraryName: /^@alifd\/next\/lib\/([^/]+)/,
        stylePath: 'style.js'
      },
      {
        libraryName: /@icedesign\/.*/,
        stylePath: 'style.js'
      }
    ])
  )
  config = injectBabelPlugin(
    [
      'import',
      [
        { libraryName: 'antd', style: true },
        { libraryName: '@alifd/next', style: true }
      ]
    ],
    config
  )

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
      '@primary-color': 'red',
      '@link-color': '#1DA57A',
      '@border-radius-base': '2px',
      '@font-size-base': '16px',
      '@line-height-base': '1.2'
    }
  })

  config = rewireDefinePlugin(config, env, {
    __DEV__: false
  })

  config = rewireSass(config)
  // scss/sass局部应用样式依赖方案
  config = rewireCssModules(config, env)

  // 短路径别名配置
  config.resolve = {
    ...config.resolve,
    alias: {
      // '@': path.resolve(__dirname, 'src'),
      '@node_modules': path.resolve(__dirname, 'node_modules'),
      '@api': path.resolve(__dirname, 'src/api'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@routerConfig': path.resolve(__dirname, 'src/routerConfig.jsx'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@routes': path.resolve(__dirname, 'src/routes'),
      '@stores': path.resolve(__dirname, 'src/stores'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@style': path.resolve(__dirname, 'src/style'),
      '@config': path.resolve(__dirname, 'src/config')
    }
  }
  // console.log(config.module.rules)
  if (env === 'production') {
    config = rewireWebpackBundleAnalyzer(config, env, {
      analyzerMode: 'static',
      reportFilename: 'report.html'
    })
  }

  return config
}
