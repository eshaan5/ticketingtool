var router = require("express").Router();
var generateAnalytics = require("./analytics.controller.js");

var passport = require("../../passport.js");

router.get("", passport.authenticate("jwt", { session: false }), generateAnalytics);

module.exports = router;