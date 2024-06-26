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
var getTickets = require('./ticket.controller').getTickets;
var updateTicket = require('./ticket.controller').updateTicket;

router.post('/create', passport.authenticate("jwt", { session: false }), middlewares.checkPermission('create-ticket'), upload.array("attachments") ,createTicket);
router.get('/getTickets', passport.authenticate("jwt", { session: false }), middlewares.checkPermission('get-ticket'), getTickets);
router.put('/update', passport.authenticate("jwt", { session: false }), middlewares.checkPermission('update-ticket'), upload.array("attachments"), updateTicket);

module.exports = router;