

/**
 * Default dev server configuration.
 */
const webpack = require('webpack');
const WebpackBaseConfig = require('./common.config');

const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

class WebpackDevConfig extends WebpackBaseConfig {
    constructor() {
        super();
        this.config = {
            devtool: 'source-map',
            entry: [
                'webpack-dev-server/client?http://0.0.0.0:3000/',
                'webpack/hot/only-dev-server',
                'react-hot-loader/patch',
                './client.js'
            ],
            plugins: [
                new webpack.optimize.ModuleConcatenationPlugin(),
                new webpack.HotModuleReplacementPlugin(),
                new webpack.NoEmitOnErrorsPlugin(),
                new webpack.ProvidePlugin({
                    $: 'jquery',
                    jQuery: 'jquery',
                    'window.jQuery': 'jquery',
                    Popper: ['popper.js', 'default']
                }),
                new BrowserSyncPlugin(
                    // BrowserSync options
                    {
                        // browse to http://localhost:3100/ during development
                        host: 'localhost',
                        port: 3100,
                        // proxy the Webpack Dev Server endpoint
                        // (which should be serving on http://localhost:3000/)
                        // through BrowserSync
                        proxy: 'http://localhost:3000/'
                    },
                    // plugin options
                    {
                        // prevent BrowserSync from reloading the page
                        // and let Webpack Dev Server take care of this
                        reload: false
                    }
                )
            ]
        };

        this.config.module.rules = this.config.module.rules.concat([
            {
                test: /^.((?!cssmodule).)*\.(sass|scss)$/,
                loaders: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            }, {
                test: /^.((?!cssmodule).)*\.less$/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    }, {
                        loader: 'less-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            }
        ]);

        // console.log(this.config.module.rules);
    }
}

module.exports = WebpackDevConfig;
