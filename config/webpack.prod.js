const helpers = require('./helpers');
const config = require('./webpack.common');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const CleanPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const SuppressExtractedTextChunksWebpackPlugin = require('./plugins/SuppressExtractedTextChunksWebpackPlugin');
const { AngularCompilerPlugin } = require('@ngtools/webpack');
const PurifyPlugin = require('@angular-devkit/build-optimizer').PurifyPlugin;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const ENV = process.env.ENV = process.env.NODE_ENV = "production";
const AOT = helpers.hasNpmFlag('aot');
const COMMON_STYLE = helpers.root('src/styles/common.scss');

module.exports = webpackMerge(config({ env: ENV }), {
    output: {
        filename: '[name].[chunkhash].bundle.js',
        chunkFilename: '[id].[chunkhash].chunk.js',
    },
    module: {
        rules: [
            { test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/, use: AOT ? ['@angular-devkit/build-optimizer/webpack-loader', '@ngtools/webpack'] : ['@ngtools/webpack'] },
            {
                test: /\.(s[ac]|c)ss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader?importLoaders=1', 'postcss-loader', 'sass-loader']
                }),
                include: [COMMON_STYLE]
            },
        ]
    },
    plugins: [
        new webpack.HashedModuleIdsPlugin(),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new CleanPlugin(['dist'], { root: helpers.root() }),
        new ExtractTextPlugin('[name].[contenthash].css'),
        new SuppressExtractedTextChunksWebpackPlugin(),
        new AngularCompilerPlugin({
            tsConfigPath: './tsconfig.json',
            mainPath: './src/main.ts',
            skipCodeGeneration: !AOT
        }),
        new PurifyPlugin(),
        new UglifyJsPlugin({
            sourceMap: false,
            parallel: true,
            uglifyOptions: {
                compress: { warnings: false, drop_console: true },
                output: { comments: false },
                ie8: true,
            },
        }),
    ]
});