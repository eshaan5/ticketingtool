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
      User.create({ email: email, password: hashedPassword, brandId: brand._id, role: "admin" }).then(function (user) {
        res.status(201).json(brand);
      });
    });
  });
}

function updateBrand(req, res) {
  var id = req.query.id;
  Brand.findOne({ _id: id }).then(function (existingBrand) {
    existingBrand.logo = req.body.logo;
    existingBrand
      .save()
      .then(function (brand) {
        res.status(200).json(brand);
      })
      .catch(function (err) {
        console.log(err, "error in updateBrand function in brand.controller.js");
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
  updateBrand: updateBrand,
};
