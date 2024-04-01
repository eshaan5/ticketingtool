var router = require("express").Router();
var passport = require("./passport.js");
var middlewares = require("./middlewares.js");

var permissions = {
  superAdmin: ["create-brand", "read-brand", "search-brand", "disable-brand"],
  admin: ["create-admin", "disable-admin", "disable-agent", "create-agent", "create-ticket-characteristics", "read-users", "read-agents", "read-tickets", "read-ticket-comments", "read-ticket-logs"],
  agent: ["create-ticket", "get-ticket", "update-ticket", "comment-ticket", "read-ticket-comments", "read-ticket-logs"],
};

router.get("/:role", passport.authenticate("jwt", { session: false }), middlewares.checkAdmin, function (req, res) {
  var role = req.params.role;
  res.status(200).json(permissions[role]);
});

module.exports = {
  permissions: permissions,
  router: router,
};
