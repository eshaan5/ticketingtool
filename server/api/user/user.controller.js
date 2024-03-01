var User = require("./user.modal.js");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

function signin(req, res) {
  var user = req.body.user;
  var password = req.body.password;

  var searchCriteria = {
    $or: [{ username: user }, { email: user }],
  };

  User.findOne(searchCriteria).then(function (existingUser) {
    if (!existingUser) {
      return res.status(404).json({ message: "User does not exist!" });
    }

    bcrypt
      .compare(password, existingUser.password)
      .then(function (isMatch) {
        if (!isMatch) {
          return res.status(400).json({ message: "Password is incorrect!" });
        }

        var token = jwt.sign({ username: existingUser.username, role: existingUser.role, id: existingUser._id }, "test", { expiresIn: "1h" });

        res.status(200).json({ result: existingUser, token: token });
      })
      .catch(function (err) {
        console.log(err, "error in signin function in user.controller.js");
      });
  });
}

function updateUser(req, res) {
  var name = req.body.name;
  var username = req.body.username;
  var id = req.query.id;
  User.findOne({ _id: id }).then(function (user) {
    user.name = name;
    user.username = username;

    user
      .save()
      .then(function (user) {
        res.status(200).json({ result: user });
      })
      .catch(function (err) {
        console.log(err, "error in updateUser function in user.controller.js");
      });
  });
}

module.exports = {
  signin: signin,
  updateUser: updateUser,
};
