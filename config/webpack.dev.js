const helpers = require('./helpers');
const config = require('./webpack.common');
const webpackMerge = require('webpack-merge');
const webpackMergeDll = webpackMerge.strategy({ plugins: 'replace' });
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const DllBundlesPlugin = require('webpack-dll-bundles-plugin').DllBundlesPlugin;

const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
const COMMON_STYLE = helpers.root('src/styles/common.scss');

module.exports = webpackMerge(config({ env: ENV }), {
    devtool: "source-map",
    module: {
        rules: [
            { test: /\.ts$/, use: ['@angularclass/hmr-loader', 'ng-router-loader', { loader: 'awesome-typescript-loader', options: { useCache: true } }, 'angular2-template-loader'] },
            {
                test: /\.(s[ac]|c)ss$/,
                use: ['style-loader', 'css-loader?importLoaders=1', 'postcss-loader', 'sass-loader'],
                include: [COMMON_STYLE]
            },
        ]
    },
    plugins: [
        /* new DllBundlesPlugin({
            bundles: {
                polyfills: [
                    'core-js',
                    {
                        name: 'zone.js',
                        path: 'zone.js/dist/zone.js'
                    },
                    {
                        name: 'zone.js',
                        path: 'zone.js/dist/long-stack-trace-zone.js'
                    },
                ],
                vendor: [
                    '@angular/animations',
                    '@angular/cdk',
                    '@angular/common',
                    '@angular/compiler',
                    '@angular/core',
                    '@angular/forms',
                    '@angular/http',
                    '@angular/material',
                    '@angular/platform-browser',
                    '@angular/platform-browser-dynamic',
                    '@angular/platform-server',
                    '@angular/router',
                    '@angularclass/hmr',
                    '@ngrx/core',
                    '@ngrx/store',
                    'rxjs',
                ]
            },
            dllDir: helpers.root('dll'),
            webpackConfig: webpackMergeDll(config({ env: ENV }), {
                devtool: 'cheap-module-source-map',
                plugins: []
            })
        }),
        new AddAssetHtmlPlugin([
            { filepath: helpers.root(`dll/${DllBundlesPlugin.resolveFile('polyfills')}`) },
            { filepath: helpers.root(`dll/${DllBundlesPlugin.resolveFile('vendor')}`) }
        ]), */
    ]
});