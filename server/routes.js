module.exports = function (app) {
    app.use("/user", require("./api/user/"));
    app.use("/brand", require("./api/brand/"));
}