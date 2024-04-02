var router = require("express").Router();

var signin = require("./user.controller.js").signin;
var updateUser = require("./user.controller.js").updateUser;
var createUser = require("./user.controller.js").createUserByEmail;
var getAllUsers = require("./user.controller.js").getAllUsers;
var updateOnlineStatus = require("./user.controller.js").updateOnlineStatus;

var passport = require("../../passport.js");
var middlewares = require("../../middlewares.js");

router.post("/login", signin);
router.put("/updateUser", passport.authenticate("jwt", { session: false }), updateUser);
router.post("/createUser", passport.authenticate("jwt", { session: false }), middlewares.checkAdmin, createUser);
router.get("/allUsers", passport.authenticate("jwt", { session: false }), getAllUsers);
router.get("/updateOnlineStatus", passport.authenticate("jwt", { session: false }), updateOnlineStatus);

module.exports = router;
