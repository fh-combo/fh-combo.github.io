const { injectBabelPlugin } = require('react-app-rewired')
const WebpackPluginImport = require('webpack-plugin-import')
const rewireSass = require('./rewire-scss')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const rewireLess = require('react-app-rewire-less')
const rewireDefinePlugin = require('react-app-rewire-define-plugin')

module.exports = function override (config,env) {
  config = injectBabelPlugin(['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }], config)
  config = injectBabelPlugin(
    ['import', { libraryName: '@alifd/next' }],
    config
  )
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
  config = injectBabelPlugin(['import', { libraryName: 'antd', style: true }], config)
  config = rewireLess.withLoaderOptions({
    modifyVars: { '@primary-color': '#1DA57A' }
  })(config, env)
  config = rewireDefinePlugin(config, env, {
    __DEV__: false
  })

  config = rewireSass(config)

  return config
}
