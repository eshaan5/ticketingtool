var router = require('express').Router();
var passport = require('../../passport.js');

var middlewares = require('../../middlewares.js');

var getLogs = require('./log.controller').getLogs;

router.get('/getLogs/:ticketId', passport.authenticate("jwt", { session: false }), middlewares.checkPermission('read-ticket-logs'), getLogs);

module.exports = router;