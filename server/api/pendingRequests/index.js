var router = require('express').Router();
var passport = require('../../passport.js');

var getPendingRequests = require('./pendingRequests.controller').getPendingRequests;

router.get('/', passport.authenticate("jwt", { session: false }), getPendingRequests);

module.exports = router;