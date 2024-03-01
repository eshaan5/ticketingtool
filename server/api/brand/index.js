var router = require("express").Router();

var createBrand = require("./brand.controller.js").createBrand;
var getAllBrands = require("./brand.controller.js").getAllBrands;
var updateBrand = require("./brand.controller.js").updateBrand;

var passport = require("../../passport.js");

router.post("/createBrand", passport.authenticate("jwt", { session: false }), createBrand);
router.get("/allBrands", passport.authenticate("jwt", { session: false }), getAllBrands);
router.post("/updateBrand", updateBrand);

module.exports = router;