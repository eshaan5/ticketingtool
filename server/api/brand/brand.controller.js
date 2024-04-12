var Brand = require("./brand.modal");
var generatePassword = require("../../utils/util").generatePassword;
var sendConfirmationEmail = require("../../utils/util").sendConfirmationEmail;
var bcrypt = require("bcrypt");
var User = require("../user/user.modal");
var permissions = require("../../permissions").permissions;

function createBrand(req, res) {
  var brand = { name: req.body.name, brandEmail: req.body.brandEmail, password: req.body.password };
  var email = req.body.email;
  Brand.create(brand).then(function (brand) {
    // generate password -> send email -> create user
    var password = generatePassword();
    sendConfirmationEmail(email, password);
    bcrypt.hash(password, 12).then(function (hashedPassword) {
      User.create({ email: email, password: hashedPassword, brandId: brand._id, role: "admin", permissions: permissions.admin, username: email }).then(function (user) {
        res.status(201).json(brand);
      });
    });
  });
}

function updateBrand(req, res) {
  var id = req.user.brandId || req.params.id;
  Brand.findByIdAndUpdate(id, req.body, { new: true })
    .then(function (brand) {
      res.status(200).json({ message: "Brand updated successfully" });
    })
    .catch(function (err) {
      res.status(500).json(err);
    });
}

function getAllBrands(req, res) {
  var page = parseInt(req.query.page) || 1;
  var limit = parseInt(req.query.limit) || 10;
  Brand.countDocuments()
    .then(function (total) {
      Brand.find()
        .skip((page - 1) * limit)
        .limit(limit)
        .then(function (brands) {
          res.status(200).json({ total: total, brands: brands });
        });
    })
    .catch(function (err) {
      res.status(500).json(err);
    });
}

function getBrand(req, res) {
  var id = req.params.id;
  Brand.findById(id)
    .then(function (brand) {
      res.status(200).json(brand);
    })
    .catch(function (err) {
      res.status(500).json(err);
    });
}

module.exports = {
  createBrand: createBrand,
  getAllBrands: getAllBrands,
  updateBrand: updateBrand,
  getBrand: getBrand,
};
