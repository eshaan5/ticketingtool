var router = require("express").Router();
var passport = require("./passport.js");
var middlewares = require("./middlewares.js");

var permissions = {
  superAdmin: {'create-brand': true, 'read-brand': true, 'search-brand': true, 'disable-brand': true},
  admin: {'create-admin': true, 'disable-admin': true, 'disable-agent': true, 'create-agent': true, 'create-ticket-characteristics': true, 'read-users': true, 'read-agents': true, 'read-tickets': true, 'read-ticket-comments': true, 'read-ticket-logs': true},
  agent: {'create-ticket': true, 'get-ticket': true, 'update-ticket': true, 'comment-ticket': true, 'read-ticket-comments': true, 'read-ticket-logs': true},
};

router.get("/:role", passport.authenticate("jwt", { session: false }), middlewares.checkAdmin, function (req, res) {
  var role = req.params.role;
  res.status(200).json(permissions[role]);
});

module.exports = {
  permissions: permissions,
  router: router,
};
