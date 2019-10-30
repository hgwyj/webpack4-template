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

>文件指纹-打包输出的文件名后缀
~~~
Hash:只要项目文件有修改,整个项目的构建hash值就会更改

Chunkhash:和webpack打包的chunk有关,不同的entry会生成不同的chunkhash值、

Contenthash:根据文件内容来定义hash,文件内容不变contenthast不变
~~~

>webpack占位符

|占位符名称|含义|
|:-----:|:----:|
|[ext]|资源后缀名|
|[name]|文件名|
|[path]|文件相对路径|
|[folder]|文件所在文件夹名称|

>loader作用简介

|名称|描述|
|----|----|
|babel-loader|转换es6,es7等js新语法新特性|
|css-loader|支持css文件的加载和解析(将css文件转换成common.js对象)))|
|less-loader|将less转换成css|
|file-loader|进行图片文字的打包|
|url-loader|处理图片和文字,可以设置较小的资源自动转换成base64|
|raw-loader|将文字以字符串的形式导入|
|thread-loader|用于多进程打包js,css|
|style-loader|将样式通过style标签插入到head中|
|postcss-loader+autoprefixer|将样式进行自动补齐前缀|

>plugins作用简介

|名称|描述|
|----|----|
|optimize-css-assets-webpack-plugin|css压缩(通常与cassnano配合使用)|
|html-webpack-plugin|创建html去承载输出的js文件(通过参数进行html压缩)|
|uglifijs-webpack-plugin|webpack4内置(mode=product 默认开启js压缩)|
|mini-css-extract-plugin|css压缩+使用link标签进行css的引用|
|clean-webpack-plugin|清理构建目录|

>splitchunks进行模块的分离
~~~
对于经常使用的模块进行分离,减少打包体积
~~~

>treeshaking
~~~
treeshaking在mode为production的时候进行自动开启
只能对es6语法生效
(*cjs不支持)
~~~

>scope hoisting
~~~
mode为production的时候默认开启进行作用域的合并
未开启之前编译后会出现大量的闭包函数,这样会加大内存的开销
只能对es6语法生效
(*cjs不支持)
~~~



