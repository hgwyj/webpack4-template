# webpack4 📦模版知识点清单
- 基本打包配置
- 常用loader使用介绍
- 打包进阶
- 打包优化
- webpack 源码分析

## 基本打包配置# webpack4-template
>webpack
~~~
webpack开箱即用只支持js和json两种文件,通过loaders去支持其他文件类型并把它们转化成有效的模块
~~~
> entry
~~~
webpack程序打包的主入口
~~~
> output
~~~
打包文件输出目的地
~~~
>mode
~~~
代表当前打包的模式 - 默认production模式
~~~
+ production
+ development
+ none
>module
~~~
各种loader加载的区域

loader的加载顺序-链式调用从后往前依次执行
~~~
|名称|描述|
|----|----|
|babel-loader|转换es6,es7.js语法新特性|
|css-loader|支持css文件的加载和解析|
|less-loader|将less转换成css|
|file-loader|进行图片文字的打包|
|raw-loader|将文字以字符串的形式导入|
|thread-loader|用于多进程打包js,css|
|style-loader|将样式通过style标签插入到head中|
>plugins
~~~
plugins进行实例化的区域
~~~
|名称|描述|
|----|----|
|optimize-css-assets-webpack-plugin|css压缩|
|html-webpack-plugin|html压缩|
|mini-css-extract-plugin|css压缩|

