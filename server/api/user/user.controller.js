var User = require("./user.modal.js");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var Brand = require("../brand/brand.modal.js");
var permissions = require("../../permissions.js").permissions;

var generatePassword = require("../../utils/util.js").generatePassword;
var sendConfirmationEmail = require("../../utils/util.js").sendConfirmationEmail;

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

    if (existingUser.role === "admin" || existingUser.role === "agent") {
      Brand.findOne({ _id: existingUser.brandId })
        .then(function (brand) {
          if (!brand) {
            return res.status(404).json({ message: "Brand does not exist!" });
          }

          if (brand.isDisabled) {
            return res.status(404).json({ message: "Your Brand is not active!" });
          }

          bcrypt.compare(password, existingUser.password).then(function (isMatch) {
            if (!isMatch) {
              return res.status(400).json({ message: "Password is incorrect!" });
            }

            var token = jwt.sign({ username: existingUser.username, role: existingUser.role, id: existingUser._id }, "test", { expiresIn: "1h" });

            res.status(200).json({ result: existingUser, token: token, brand: brand });
          });
        })
          .catch(function (err) {
          console.log(err, "error in signin function in user.controller.js");
        });
    }

    if (existingUser.role === "superAdmin") {
      bcrypt.compare(password, existingUser.password).then(function (isMatch) {
        if (!isMatch) {
          return res.status(400).json({ message: "Password is incorrect!" });
        }

        var token = jwt.sign({ username: existingUser.username, role: existingUser.role, id: existingUser._id }, "test", { expiresIn: "1d" });

        res.status(200).json({ result: existingUser, token: token });
      });
    }
  });
}

function updateUser(req, res) {
  var id = req.user._id;
  User.findByIdAndUpdate(id, req.body, { new: true })
    .then(function (user) {
      res.status(201).json({ result: user });
    })
    .catch(function (err) {
      res.status(400).json(err);
    });
}

function createUserByEmail(req, res) {
  var email = req.body.email;
  var role = req.body.role;
  var customPermissions = req.body.permissions;
  var brandId = req.user.brandId;

  var password = generatePassword();
  sendConfirmationEmail(email, password);

  bcrypt.hash(password, 12).then(function (hashedPassword) {
    User.create({ email: email, password: hashedPassword, brandId: brandId, role: role, permissions: customPermissions})
      .then(function (user) {
        res.status(201).json(user);
      })
      .catch(function (err) {
        res.status(500).json(err);
      });
  });
}

function getAllUsers(req, res) {
  var searchCriteria = {
    $and: [{ brandId: req.user.brandId }],
  };

  User.find(searchCriteria)
    .then(function (users) {
      res.status(200).json(users);
    })
    .catch(function (err) {
      res.status(500).json(err);
    });
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

function getAllAdmins(req, res) {

  var brandId = req.query.brandId;

  var searchCriteria = {
    $and: [{ brandId: brandId }, { role: "admin" }],
  };

  User.find(searchCriteria)
    .then(function (users) {
      res.status(200).json(users);
    })
    .catch(function (err) {
      res.status(500).json(err);
    });
}

module.exports = {
  signin: signin,
  updateUser: updateUser,
  createUserByEmail: createUserByEmail,
  getAllUsers: getAllUsers,
  updateOnlineStatus: updateOnlineStatus,
  getAllAdmins: getAllAdmins,
};
