

const path = require('path');
const glob = require('glob');
const autoprefixer = require('autoprefixer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Frienderrorsonly = require('friendly-errors-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 实现多页面打包func
const setMPA = () => {
  const entry = {};
  const htmlwebpackplugins = [];
  const entryFiles = glob.sync(path.join(__dirname, 'src/*/index.*(js|jsx|ts|tsx)'));
  Object.keys(entryFiles).forEach((index) => {
    const file = entryFiles[index];
    const match = file.match(/src\/(.*)\/index\.(js|jsx)$/);
    const pagename = match && match[1];
    entry[pagename] = file;
    htmlwebpackplugins.push(
      new HtmlWebpackPlugin({
        template: path.join(__dirname, `src/${pagename}/index.html`),
        filename: `${pagename}.html`,
        chunks: [pagename, 'commons'], // script 标签进行引用模块名称
        inject: true,
        minify: {
          html5: true,
          removeComments: false, // ssr removeComments:false or true
          preserveLineBreaks: false,
          minifyCSS: true,
          minifyJS: true,
          collapseWhitespace: true,
        },
      }),
    );
  });
  return {
    entry,
    htmlwebpackplugins,
  };
};
const { entry, htmlwebpackplugins } = setMPA();
module.exports = {
  stats: 'errors-only',
  entry,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]_[chunkhash:4].js',
  },
  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader?cacheDirectory=true', // 开启缓存,二次编译时使用缓存
          // "eslint-loader"//增加eslint检测
        ],
      },
      {
        test: /.css$/,
        use: [
          'style-loader', // 在head标签钟生成style标签将样式自动生成在style标签中
          'css-loader',
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
            },
          },
          {
            loader: 'postcss-loader', // 使用postcss进行css样式后缀的补全
            options: {
              plugins: () => [
                autoprefixer({
                  overrideBrowserslist: ['last 2 version', '>1%', 'ios 7'],
                }),
              ],
            },
          },
          'less-loader',
        ],
      },
      {
        test: /.(png|jepg|jpg|gif)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name]_[hash:8].[ext]',
          },
        }],
      },
      {
        test: /.(png|jepg|jpg|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            name: '[name]_[hash:8].[ext]',
            limit: 10240, // 小于10M文件使用url-loader
          },
        }],
      },
      {
        test: /.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]_[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new Frienderrorsonly(),
    function errorPlugin() {
      this.hooks.done.tap('done', (stats) => {
        if (stats.compilation.errors && stats.compilation.errors.length
          && process.argv.indexOf('--watch') === -1) {
          console.log('build error'); //eslint-disable-line
          process.exit(1);
        }
      });
    },
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:4].css',
    }),
  ].concat(htmlwebpackplugins),
};
