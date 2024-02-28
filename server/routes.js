module.exports = function (app) {
    app.use("/user", require("./api/user/"));
}