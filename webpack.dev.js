"use strict";
const path = require("path");
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
    entry: {
        index: "./src/singlePagePack/index.js"
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: '[name]_[chunkhash:4].js'
    },
    mode: "production",
    module: {
        rules: [
            {
                test: /.js$/,
                use: "babel-loader"
            },
            {
                test: /.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            },
            {
                test: /.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 2,
                            modules: true
                        }
                    },
                    "less-loader",
                    {
                        loader: "postcss-loader", //使用postcss进行css样式后缀的补全
                        options: {
                            plugins: () => {
                                require("autoprefixer")({
                                    browsers: ['last 2 version', '>1%', 'ios 7']
                                });
                            }
                        }
                    }
                ]
            },
            {
                test: /.(png|jepg|jpg|gif)$/,
                use: [{
                    loader: "file-loader",
                    options: {
                        name: "[name]_[hash:8].[ext]"
                    }
                }]
            },
            {
                test: /.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name]_[hash:8].[ext]"
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new frienderrorsonly(),
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name]_[contenthash:8].css"
        }),
        new OptimizeCSSAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano')
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src/singlePagePack/index.html'),
            filename: 'index.html',
            chunks: ['index'],
            inject: true,
            minify: {
                html5: true,
                collapseWhitespace: true,
                preserveLineBreaks: false,
                minifyCSS: true,
                minifyJS: true,
                removeComments: true
            }
        }).concat(htmlwebpackplugins),
    ],
    devServer: {
        contentBase: "./dist",
        hot: true,
        port: 8888,
        stats: "errors-only"
    },
    optimization: {
        splitChunks: {
            minSize: 0,
            cacheGroups: {
                commons: {
                    test: /(react|react-dom)/,
                    name: 'commons',
                    chunks: 'all',
                    minChunks: 2
                }
            }
        }
    }
};