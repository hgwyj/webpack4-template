const path = require("path");
const webpack = require("webpack");
const rimraf = require("rimraf");
const Mocha = require("mocha");
const mocha = new Mocha({
    timeout: "10000ms"
});
//改变当前进程运行路径
process.chdir(path.join(__dirname, "template"));
rimraf("./dist", () => {
    const productConfig = require("../../lib/webpack.prod.js.js");
    webpack(productConfig, (err, stats) => {
        if (err) {
            console.error(err);
            process.exit(2);
        }
        console.log(stats.toString({
            colors: true,
            modules: false,
            children: false
        }));
        console.log("webpack build success, begin run test ");
        mocha.addFile(path.join(__dirname, "html-test.js"));
        mocha.addFile(path.join(__dirname, "css-js-test.js"));
        mocha.run();
    });
});