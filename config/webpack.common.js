const helpers = require('./helpers');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');
const rxPaths = require('rxjs/_esm5/path-mapping');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const devServer = require('./devServer');
const spritesmithConfig = require('./spritesmithConfig');
const htmlLoaderConfig = require('./htmlLoaderConfig');
const INDEX_HTML = helpers.root('src/index.html');
const COMMON_STYLE = helpers.root('src/styles/common.scss');
const entryPoints = ["manifest", "polyfills", "vendor", "common", "main"];

module.exports = function(options) {

    const isProd = options.env === 'production';

    return {

        devServer: devServer,

        entry: {
            polyfills: [helpers.root('src/polyfills.ts')],
            main: [helpers.root('src/main.ts')],
            common: [COMMON_STYLE]
        },

        output: {
            path: helpers.root('dist'),
            filename: '[name].bundle.js',
            chunkFilename: '[id].chunk.js',
            sourceMapFilename: '[file].map',
        },

        resolve: {
            extensions: ['.ts', '.js'],
            // modules: [helpers.root('node_modules')],
            alias: rxPaths()
        },

        module: {
            rules: [
                { test: /\.html$/, use: ['ejs-tpl-loader'], include: [INDEX_HTML] },
                { test: /\.json$/, use: ['json-loader'] },
                { test: /\.css$/,  use: ['raw-loader', 'postcss-loader', 'sass-loader'], exclude: [COMMON_STYLE] },
                { test: /\.scss$/, use: ['raw-loader', 'postcss-loader', 'sass-loader'], exclude: [COMMON_STYLE] },
                {
                    test: /\.html$/,
                    use: [{
                        loader: 'html-loader',
                        options: htmlLoaderConfig
                    }], exclude: [INDEX_HTML]
                },
                {
                    test: /\.(jpe?g|png|gif|svg)$/,
                    use: [{
                        loader: 'url-loader',
                        options: {
                            limit: 10240,
                            name: '[path][name].[hash].[ext]',
                            outputPath: url => url.replace(/^src/, '.')
                        }
                    }]
                },
                {
                    test: /\.(eot|woff2?|ttf)([\?]?.*)$/,
                    use: [{
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[hash].[ext]',
                            outputPath: url => url.replace(/^src/, '.')
                        }
                    }]
                },
            ]
        },

        plugins: [
            new webpack.NoEmitOnErrorsPlugin(),
            new webpack.DefinePlugin({
                'PROD_ENV': JSON.stringify(isProd)
            }),
            /* new CopyPlugin([{
                from: helpers.root('src/assets'),
                to: 'assets/[path][name].[hash].[ext]',
                ignore: ['favicon.ico']
            }]), */
            new CheckerPlugin(),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'polyfills',
                chunks: ['polyfills'],
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor',
                chunks: ['main'],
                minChunks: module => /node_modules/.test(module.resource)
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'manifest',
                minChunks: Infinity
            }),
            new webpack.ContextReplacementPlugin(
                /\@angular(\\|\/)core(\\|\/)esm5/,
                helpers.root('src')
            ),
            new HtmlPlugin({
                filename: 'index.html',
                template: helpers.root('src/index.html'),
                favicon: helpers.root('src/assets/favicon.ico'),
                chunksSortMode: function sort(left, right) {
                    let leftIndex = entryPoints.indexOf(left.names[0]);
                    let rightindex = entryPoints.indexOf(right.names[0]);
                    if (leftIndex > rightindex) {
                        return 1;
                    } else if (leftIndex < rightindex) {
                        return -1;
                    } else {
                        return 0;
                    }
                },
                inject: 'head'
            }),
            new ScriptExtHtmlWebpackPlugin({
                defaultAttribute: 'defer'
            }),
            new InlineManifestWebpackPlugin(),
            ...spritesmithConfig,
            /**
             * If you are interested to drill down to exact dependencies, try analyzing your bundle without ModuleConcatenationPlugin. See issue https://github.com/webpack-contrib/webpack-bundle-analyzer/issues/115 for more discussion.
             */
            // new BundleAnalyzerPlugin(),
        ]
    }
}