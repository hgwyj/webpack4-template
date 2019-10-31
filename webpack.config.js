"use strict";
const path = require("path");
const glob = require("glob");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
//实现多页面打包func
const setMPA = () => {
    const entry = {};
    const htmlwebpackplugins = [];
    const entryFiles = glob.sync(path.join(__dirname, "src/*/index.*(js|jsx)"));
    Object.keys(entryFiles).forEach((index) => {
        const file = entryFiles[index];
        const match = file.match(/src\/(.*)\/index\.(js|jsx)$/);
        const pagename = match && match[1];
        entry[pagename] = file;
        htmlwebpackplugins.push(
            new HtmlWebpackPlugin({
                template: path.join(__dirname, `src/${pagename}/index.html`),
                filename: `${pagename}/${pagename}.html`,
                chunks: [pagename, "commons"],//script 标签进行引用模块名称
                inject: true,
                minify: {
                    html5: true,
                    removeComments: true,
                    preserveLineBreaks: false,
                    minifyCSS: true,
                    minifyJS: true,
                    collapseWhitespace: true
                }
            })
        )
    });
    return {
        entry,
        htmlwebpackplugins
    };
};
const { entry, htmlwebpackplugins } = setMPA();
module.exports = {
    entry,
    output: {
        path: path.join(__dirname, "dist"),
        filename: '[name]/[name]_[chunkhash:4].js'
    },
    mode: "production",
    resolve: {
        extensions: [".js", ".jsx", ".json"]
    },
    module: {
        rules: [
            {
                test: /.(js|jsx)$/,
                use: "babel-loader"
            },
            {
                test: /.css$/,
                use: [
                    "style-loader", //在head标签钟生成style标签将样式自动生成在style标签中
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
                            modules: true
                        }
                    },
                    "less-loader",
                    {
                        loader: "postcss-loader", //使用postcss进行css样式后缀的补全
                        options: {
                            plugins: () => [
                                require('autoprefixer')({
                                    browsers: ['last 2 version', '>1%', 'ios 7']
                                })
                            ]
                        }
                    },
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
        new MiniCssExtractPlugin({
            filename: "[name]/[name]_[contenthash:4].css"
        }),
        new OptimizeCSSAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano') //css处理器
        })
    ].concat(htmlwebpackplugins),
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