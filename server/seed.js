var User = require("./api/user/user.modal.js");
var bcrypt = require("bcrypt");

module.exports = function() {
  User.findOne({ role: "superAdmin" }).then(function (superAdmin) {
    if (superAdmin) {
      console.log("Super Admin already exists");
      return;
    }
    var superAdmin = {
      name: "Super Admin",
      email: "superadmin@gmail.com",
      username: "superadmin",
      role: "superAdmin",
    };

    bcrypt.hash("Passw0rd#", 12).then(function (hash) {
      superAdmin.password = hash;
      User.create(superAdmin)
        .then(function (user) {
          console.log("Super Admin created successfully");
        })
        .catch(function (err) {
          console.log("Super Admin creation failed");
        });
    });
  });
}
