var router = require("express").Router();

var createBrand = require("./brand.controller.js").createBrand;
var getAllBrands = require("./brand.controller.js").getAllBrands;
var updateBrand = require("./brand.controller.js").updateBrand;

var passport = require("../../passport.js");
var middlewares = require("../../middlewares.js");

router.post("/createBrand", passport.authenticate("jwt", { session: false }), middlewares.checkSuperAdmin,createBrand);
router.get("/allBrands", passport.authenticate("jwt", { session: false }), middlewares.checkSuperAdmin, getAllBrands);
router.post("/updateBrand", updateBrand);
router.put("/disableBrand/:id", passport.authenticate("jwt", { session: false }), middlewares.checkSuperAdmin, updateBrand);

module.exports = router;