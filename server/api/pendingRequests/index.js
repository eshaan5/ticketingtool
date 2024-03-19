var router = require('express').Router();
var passport = require('../../passport.js');

var getPendingRequests = require('./pendingRequests.controller').getPendingRequests;
var manipulateRequest = require('./pendingRequests.controller').manipulateRequest;

router.get('/', passport.authenticate("jwt", { session: false }), getPendingRequests);
router.put('/:requestId/:action', passport.authenticate("jwt", { session: false }), manipulateRequest);

module.exports = router;