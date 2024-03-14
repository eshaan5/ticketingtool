module.exports = function (app) {
    app.use("/user", require("./api/user/"));
    app.use("/brand", require("./api/brand/"));
    app.use("/ticketType", require("./api/ticketType/"));
    app.use("/ticketRelation", require("./api/ticketRelation/"));
}