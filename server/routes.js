module.exports = function (app) {
    app.use("/user", require("./api/user/"));
    app.use("/brand", require("./api/brand/"));
    app.use("/ticketType", require("./api/ticketType/"));
    app.use("/ticketRelation", require("./api/ticketRelation/"));
    app.use("/ticket", require("./api/ticket/"));
    app.use("/pendingRequests", require("./api/pendingRequests/"));
    app.use("/log", require("./api/log/"));
}