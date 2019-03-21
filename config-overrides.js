const { injectBabelPlugin } = require('react-app-rewired')
const WebpackPluginImport = require('webpack-plugin-import')
const rewireSass = require('./rewire-scss')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const rewireLess = require('react-app-rewire-less')
const rewireDefinePlugin = require('react-app-rewire-define-plugin')
const rewireWebpackBundleAnalyzer = require('react-app-rewire-webpack-bundle-analyzer')
const path = require('path')

module.exports = function override(config, env) {
    config = injectBabelPlugin(
        ['import', {
            libraryName: 'antd',
            libraryDirectory: 'es',
            style: 'css'
        }],
        config)
    config = injectBabelPlugin(
        ['import', { libraryName: '@alifd/next' }],
        config
    )
    config.plugins.push(new ProgressBarPlugin())
    config.plugins.push(
        new WebpackPluginImport([{
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

    // 短路径别名配置
    config.resolve = {
        ...config.resolve,
        alias: {
            // '@': path.resolve(__dirname, 'src'),
            '@node_modules': path.resolve(__dirname, 'node_modules'),
            '@api': path.resolve(__dirname, 'src/api'),
            '@components': path.resolve(__dirname, 'src/components'),
            '@assets': path.resolve(__dirname, 'src/assets'),
            '@routerConfig': path.resolve(__dirname, 'src/routerConfig.js'),
            '@pages': path.resolve(__dirname, 'src/pages'),
            '@routes': path.resolve(__dirname, 'src/routes'),
            '@stores': path.resolve(__dirname, 'src/stores'),
            '@utils': path.resolve(__dirname, 'src/utils'),

        }
    }

    if (env === 'production') {
        config = rewireWebpackBundleAnalyzer(config, env, {
            analyzerMode: 'static',
            reportFilename: 'report.html'
        })
    }

    return config
}