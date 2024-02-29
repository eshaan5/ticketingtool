var Brand = require("./brand.model");
var generatePassword = require("../../util").generatePassword;
var sendConfirmationEmail = require("../../util").sendConfirmationEmail;
var bcrypt = require("bcrypt");
var User = require("../user/user.modal");

function createBrand(req, res) {
  var brand = { name: req.body.name };
  var email = req.body.email;
  Brand.create(brand).then(function (brand) {
    // generate password -> send email -> create user
    var password = generatePassword();
    sendConfirmationEmail(email, password);
    bcrypt.hash(password, 12).then(function (hashedPassword) {
      User.create({ email: email, password: hashedPassword, brand: brand._id, role: "admin" }).then(function (user) {
        res.status(201).json(brand);
      });
    });
  });
}

function getAllBrands(req, res) {
  Brand.find({}).then(function (brands) {
    res.status(200).json(brands);
  });
}

module.exports = {
  createBrand: createBrand,
  getAllBrands: getAllBrands,
};
