//千分位小数点添加
const transferRgx = function (str) {
    if (typeof str === "string") {
        return str.replace(/\d{1,3}(?=(\d{3})+$)/g, "$&,");
    }
    return str;
};
// console.log(transferRgx("32838232"));