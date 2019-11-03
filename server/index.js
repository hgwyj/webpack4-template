//node环境中浏览器全局对象window不存在需要手动创建
if (typeof window === "undefined") global.window = {};
const express = require("express");
const data = require("./data.json");
const fs = require("fs");
const path = require("path");
const { renderToString } = require("react-dom/server");
const ssr = require("../dist/search-server");
const template = fs.readFileSync(path.join(__dirname, '../dist/search.html'), 'utf-8');
const server = (port) => {
    const app = express();
    app.use(express.static(path.join(__dirname, "../dist")));
    app.get("/search", (req, res) => {
        const html = renderMarkUp(renderToString(ssr));
        res.status(200).send(html);
    });
    app.listen(port, () => {
        console.log(`server is run at port: ${port}`);
    });
};
server(process.env.PORT || 3000);
const renderMarkUp = (str) => {
    const dataStr = JSON.stringify(data);
    //模版字符串的可以解决css样式加载不出来的问题
    return template.replace('<!--HTML_PLACEHOLDER-->', str)
        .replace('<!--INITIAL_DATA_PLACEHOLDER-->', `<script>window.__initial_data=${dataStr}</script>`);
};