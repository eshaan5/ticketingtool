var router = require("express").Router();

var signin = require("./user.controller.js").signin;

router.post("/login", signin);

module.exports = router;
