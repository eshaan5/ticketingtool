var router = require("express").Router();

var signin = require("./user.controller.js").signin;
var updateUser = require("./user.controller.js").updateUser;

router.post("/login", signin);
router.post("/updateUser", updateUser);

module.exports = router;
