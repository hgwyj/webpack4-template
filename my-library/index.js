if (process.env.NODE_ENV === "production") {
    module.exports = require("./dist/my-library.min.js");
} else {
    module.exports = require("./dist/my-library.js");
};