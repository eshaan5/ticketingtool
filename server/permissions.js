var router = require("express").Router();
var passport = require("./passport.js");
var middlewares = require("./middlewares.js");

var permissions = {
  superAdmin: {'create-brand': true, 'read-brand': true, 'search-brand': true, 'disable-brand': true, 'create-user': true },
  admin: {'create-user': true, 'disable-user': true, 'create-ticket-characteristics': true, 'read-users': true, 'read-tickets': true, 'read-ticket-comments': true, 'read-ticket-logs': true, 'update-brand': true, 'read-brand': true, 'get-ticket': true},
  agent: {'create-ticket': true, 'get-ticket': true, 'update-ticket': true, 'comment-ticket': true, 'read-ticket-comments': true, 'read-ticket-logs': true, 'get-ticket-characteristics': true, 'read-users': true},
};

router.get("/:role", passport.authenticate("jwt", { session: false }), middlewares.checkPermission('create-user'), function (req, res) {
  var role = req.params.role;
  res.status(200).json(permissions[role]);
});

module.exports = {
  permissions: permissions,
  router: router,
};
