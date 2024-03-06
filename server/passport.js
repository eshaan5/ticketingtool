var passport = require("passport");
var passportJWT = require("passport-jwt");
var User = require("./api/user/user.modal");

var ExtractJwt = passportJWT.ExtractJwt;
var JWTStrategy = passportJWT.Strategy;

var opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "test",
};

passport.use(
  new JWTStrategy(opts, function (jwt_payload, done) {
    User.findOne({ _id: jwt_payload.id })
      .then(function (user) {
        if (user) {
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

module.exports = passport;