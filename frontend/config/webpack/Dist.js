'use strict';

/**
 * Dist configuration. Used to build the
 * final output when running npm run dist.
 */
const webpack = require('webpack');
const WebpackBaseConfig = require('./Base');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const path = require('path');
const ROOT = path.resolve(__dirname, '../..');
function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [ROOT].concat(args));
}

class WebpackDistConfig extends WebpackBaseConfig {

  constructor() {
    super();
    this.config = {
      cache: false,
      devtool: 'source-map',
      entry: [
        './client.js'
      ],
      output: {
        path: root('dist'),
        publicPath: '/',
        filename: 'assets/app.js',
        chunkFilename: 'assets/[id].[hash].chunk.js'
      },
      plugins: [
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': '"production"'
        }),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.ProvidePlugin({
          $: "jquery",
          jQuery: "jquery",
          "window.jQuery": "jquery"
        }),
        new CopyWebpackPlugin([
          {from: root('public/index.html'), to: root('dist/') },
          {from: root('public/favicon.ico'), to: root('dist/') },
          {from: root('public/vendors'), to: root('dist/vendors') },
          {from: root('src/assets/images'), to: root('dist/assets/images') },
          {from: root('src/assets/images-demo'), to: root('dist/assets/images-demo') },
        ]),
      ]
    };

    // Deactivate hot-reloading if we run dist build on the dev server
    this.config.devServer.hot = false;

    this.config.module.rules = this.config.module.rules.concat([
      {
        test: /^.((?!cssmodule).)*\.(sass|scss)$/,
        loaders: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
          { loader: 'sass-loader' }
        ]
      }, {
        test: /^.((?!cssmodule).)*\.less$/,
        loaders: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
          { loader: 'less-loader' }
        ]
      }
    ])
  }

  /**
   * Get the environment name
   * @return {String} The current environment
   */
  get env() {
    return 'dist';
  }
}

module.exports = WebpackDistConfig;
