var router = require("express").Router();
var passport = require("../../passport.js");
var middlewares = require("../../middlewares.js");

var addTicketType = require("./ticketType.controller.js").addTicketType;
var getTicketTypes = require("./ticketType.controller.js").getTicketTypes;

router.post("/addTicketType", passport.authenticate("jwt", { session: false }), middlewares.checkAdmin, addTicketType);
router.get("/getTicketTypes", passport.authenticate("jwt", { session: false }), getTicketTypes);

module.exports = router;