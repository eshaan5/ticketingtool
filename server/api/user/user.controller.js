var User = require("./user.modal.js");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

var generatePassword = require("../../util").generatePassword;
var sendConfirmationEmail = require("../../util").sendConfirmationEmail;

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
  var id = req.user._id;
  User.findOne({ _id: id }).then(function (user) {
    user.name = name;
    user.username = username;

    user
      .save()
      .then(function (user) {
        res.status(201).json({ result: user });
      })
      .catch(function (err) {
        res.status(400).json(err);
      });
  });
}

function createUserByEmail(req, res) {
  console.log("createUserByEmail");
  var email = req.body.email;
  var role = "agent";
  var brandId = req.user.brandId;

  var password = generatePassword();
  sendConfirmationEmail(email, password);

  bcrypt.hash(password, 12).then(function (hashedPassword) {
    User.create({ email: email, password: hashedPassword, brandId: brandId, role: role }).then(function (user) {
      res.status(201).json(user);
    })
    .catch(function (err) {
      res.status(500).json(err);
    });
  });
}

function getAllAgents(req, res) {

  var searchCriteria = {
    $and: [
      { role: "agent" },
      { brandId: req.user.brandId }
    ]
  };

  User.find(searchCriteria).then(function (agents) {
    res.status(200).json(agents);
  })
  .catch(function (err) {
    res.status(500).json(err);
  })
}

function updateOnlineStatus(req, res) {
  var id = req.user._id;
  User.findOne({ _id: id }).then(function (user) {
    user.isOnline = !user.isOnline;

    user
      .save()
      .then(function (user) {
        res.status(201).json({ result: user });
      })
      .catch(function (err) {
        res.status(400).json(err);
      });
  });
}

module.exports = {
  signin: signin,
  updateUser: updateUser,
  createUserByEmail: createUserByEmail,
  getAllAgents: getAllAgents,
  updateOnlineStatus: updateOnlineStatus,
};
