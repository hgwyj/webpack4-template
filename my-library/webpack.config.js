"use strict";
const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
module.exports = {
    entry: {
        "my-library": "./src/index.js",
        "my-library.min": "./src/index.js"
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].js",
        library: "my-library",//指定库文件全局变量名
        libraryTarget: "umd", //支持对库引用的方式
        libraryExport: "default"
    },
    mode: "none",
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                include: /\.min\.js/
            })
        ]
    }
};