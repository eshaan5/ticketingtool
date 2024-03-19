var router = require('express').Router();
var passport = require('../../passport.js');

var getLogs = require('./log.controller').getLogs;

router.get('/getLogs', passport.authenticate("jwt", { session: false }), getLogs);

module.exports = router;