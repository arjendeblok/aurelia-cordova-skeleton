const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { AureliaPlugin } = require('aurelia-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin('app/app.css');
const bundleOutputDir = './www';

module.exports = ({ prod, cordova } = {}) => {
    const isDevBuild = !prod;
    const isCordova = cordova || false;

    return [{
        resolve: {
            extensions: ['.ts', '.js'],
            modules: ['src', 'node_modules'] // .map(x => path.resolve(x))
        },
        entry: {
            'app': 'aurelia-bootstrapper'
        },
        output: {
            path: path.resolve(bundleOutputDir),
            publicPath: '/',
            filename: 'app/app.js'
        },
        devServer: {
            contentBase: './www'
        },
        module: {
            rules: [
                { test: /\.ts$/i, include: /src/, use: 'ts-loader' },
                { test: /\.html$/i, use: 'html-loader' },
                {
                    test: /\.css$/i, use: isDevBuild ?
                        ['style-loader', 'css-loader'] :
                        extractCSS.extract('css-loader?minimize')
                },
                { test: /\.(png|jpg|jpeg|gif|svg|ttf|eot)$/, use: 'url-loader?limit=25000' },
                { test: /\.woff$/, use: "url-loader?prefix=font/&limit=5000&mimetype=application/font-woff" },
                { test: /\.woff2$/, use: "url-loader?prefix=font/&limit=5000&mimetype=application/font-woff2" }
            ]
        },

        plugins: [
            extractCSS,
            new webpack.DefinePlugin({ IS_DEV_BUILD: JSON.stringify(isDevBuild), IS_CORDOVA: JSON.stringify(isCordova) }),
            new AureliaPlugin({ aureliaApp: 'main', dist: 'native-modules' }),
            new HtmlWebpackPlugin({
                template: 'index.ejs',
                minify: prod ? {
                    removeComments: true,
                    collapseWhitespace: true
                } : undefined,
                metadata: {
                   prod, cordova
                }
            })
        ].concat(isDevBuild ? [
            new webpack.SourceMapDevToolPlugin({
                filename: '[file].map', // Remove this line if you prefer inline source maps
                moduleFilenameTemplate: path.relative(bundleOutputDir, '[resourcePath]')  // Point sourcemap entries to the original file locations on disk
            })
        ] : [])
    }];
};
