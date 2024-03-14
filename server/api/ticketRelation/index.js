var router = require("express").Router();
var passport = require("../../passport.js");
var middlewares = require("../../middlewares.js");

var addTicketRelation = require("./ticketRelation.controller.js").addTicketRelation;
var getTicketRelations = require("./ticketRelation.controller.js").getTicketRelations;

router.post("/addTicketRelation", passport.authenticate("jwt", { session: false }), middlewares.checkAdmin, addTicketRelation);
router.get("/getTicketRelations", passport.authenticate("jwt", { session: false }), getTicketRelations);

module.exports = router;