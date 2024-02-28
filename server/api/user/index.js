var router = require("express").Router();
var passport = require("passport");
var passportJWT = require("passport-jwt");

var signin = require("./user.controller").signin;
var signup = require("./user.controller").signup;

var User = require("./user.modal.js");

var ExtractJwt = passportJWT.ExtractJwt;
var JWTStrategy = passportJWT.Strategy;

var opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "test",
};

passport.use(
  new JWTStrategy(opts, function (jwt_payload, done) {
    User.findOne({ id: jwt_payload.id })
      .then(function (user) {
        if (user.role === "superAdmin") {
          done(null, user);
        } else {
          done(null, false);
        }
      })
      .catch(function (err) {
        done(err, false);
      });
  })
);

router.post("/login", signin);

router.post("/signup", passport.authenticate("jwt", { session: false }), function (req, res) {});

module.exports = router;
