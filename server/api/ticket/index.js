var router = require('express').Router();
var passport = require('../../passport.js');
var middlewares = require('../../middlewares.js');
var multer = require('multer');

var storage = multer.memoryStorage();
var upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024,
        files: 4,
    },
});

var createTicket = require('./ticket.controller').createTicket;

router.post('/create', passport.authenticate("jwt", { session: false }), upload.array("attachments") ,createTicket);

module.exports = router;