var router = require("express").Router();

var signin = require("./user.controller.js").signin;
var updateUser = require("./user.controller.js").updateUser;
var createUser = require("./user.controller.js").createUserByEmail;
var getAllUsers = require("./user.controller.js").getAllUsers;
var updateOnlineStatus = require("./user.controller.js").updateOnlineStatus;
var getAllAdmins = require("./user.controller.js").getAllAdmins;
var changePassword = require("./user.controller.js").changePassword;

var passport = require("../../passport.js");
var middlewares = require("../../middlewares.js");

router.post("/login", signin);
router.put("/updateUser", passport.authenticate("jwt", { session: false }), updateUser);
router.post("/createUser", passport.authenticate("jwt", { session: false }), middlewares.checkPermission("create-user"), createUser);
router.get("/allUsers", passport.authenticate("jwt", { session: false }), middlewares.checkPermission("read-users"), getAllUsers);
router.get("/updateOnlineStatus", passport.authenticate("jwt", { session: false }), updateOnlineStatus);
router.get("/getAdmins", passport.authenticate("jwt", { session: false }), getAllAdmins);
router.post("/changePassword", passport.authenticate("jwt", { session: false }), changePassword);

module.exports = router;
