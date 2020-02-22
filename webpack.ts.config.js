'use strict';
const path = require('path');
const glob = require('glob');
const Webpack = require('webpack');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin'); //将dll文件insert into html与htmlwebpackplugin搭配使用
const Frienderrorsonly = require('friendly-errors-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');//开启模块的缓存
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const speedMeasureWebpackPlugin = require("speed-measure-webpack-plugin"); //webpack package 速度分析
// const smp = new speedMeasureWebpackPlugin();
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;//构建体积分析插件
const TerserPlugin = require('terser-webpack-plugin'); //并行压缩
//实现多页面打包func
const setMPA = () => {
    const entry = {};
    const htmlwebpackplugins = [];
    const entryFiles = glob.sync(path.join(__dirname, 'src/*/index.*(js|jsx|ts|tsx)'));
    Object.keys(entryFiles)
        .forEach((index) => {
            const file = entryFiles[index];
            const match = file.match(/src\/(.*)\/index\.(js|jsx|ts|tsx)$/);
            const pagename = match && match[1];
            entry[pagename] = file;
            htmlwebpackplugins.push(
                new HtmlWebpackPlugin({
                    template: path.join(__dirname, `src/${pagename}/index.html`),
                    filename: `${pagename}.html`,
                    chunks: [pagename, 'commons'],//script 标签进行引用模块名称
                    inject: true,
                    minify: {
                        html5: true,
                        removeComments: false, //ssr removeComments:false or true
                        preserveLineBreaks: false,
                        minifyCSS: true,
                        minifyJS: true,
                        collapseWhitespace: true
                    }
                })
            );
        });
    return {
        entry,
        htmlwebpackplugins
    };
};
const { entry, htmlwebpackplugins } = setMPA();

module.exports = {
    entry: entry,
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name]_[chunkhash:4].js'
    },
    stats: 'errors-only',
    mode: 'production',
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "react": path.join(__dirname, "node_modules/react/cjs/react.production.min.js"),
            "react-dom": path.join(__dirname, "node_modules/react-dom/cjs/react-dom.production.min.js"),
            "lodash": path.join(__dirname, "node_modules/lodash/lodash.min.js"),
        },
        modules: [path.join(__dirname, 'node_modules')],
        extensions: ['.ts', '.tsx', '.json'] //指定解析的后缀,如果不指定webpack默认直解析js|json
    },
    module: {
        rules: [
            {
                test: /.tsx?$/,
                exclude: /node_modules/,
                use: [
                    'ts-loader'
                ],
            },
            {
                test: /.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                        }
                    },
                    {
                        loader: 'postcss-loader', //使用postcss进行css样式后缀的补全
                        options: {
                            plugins: () => [
                                require('autoprefixer')({
                                    overrideBrowserslist: ['last 2 version', '>1%', 'ios 7']
                                })
                            ]
                        }
                    },
                    'less-loader',
                ]
            },
            {
                test: /.(png|jepg|jpg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name]_[hash:8].[ext]'
                    }
                }]
            },
            {
                test: /.(png|jepg|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        name: '[name]_[hash:8].[ext]',
                        limit: 10240 // 小于10M文件使用url-loader
                    }
                }]
            },
            {
                test: /.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]_[hash:8].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new Webpack.DllReferencePlugin({
            manifest: require('./build/library/library.json')
        }),
        // new BundleAnalyzerPlugin(),
        new Frienderrorsonly(),
        function () {
            this.hooks.done.tap('done', (stats) => {
                if (stats.compilation.errors && stats.compilation.errors.length
                    && process.argv.indexOf('--watch') == -1) {
                    console.log('build error');
                    process.exit(1);
                }
            });
        },
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash:4].css'
        }),
        new OptimizeCSSAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano') //css处理器
        }),
        new HardSourceWebpackPlugin()
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
        },
        minimizer: [
            new TerserPlugin({ //开启并行压缩
                parallel: true,
                cache: true//开启缓存
            })
        ]
    }
};
