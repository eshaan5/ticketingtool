app.factory("UserFactory", function ($http) {
  function User(user) {
    this.email = user.email;
    this.role = user.role;
    this.permissions = user.permissions;
  }

  User.prototype.checkError = function () {
    if (!this.email) return "No email provided";
    if (!this.email.match(/^[a-zA-Z\d][^\s@]+@[^\s@]+\.[a-zA-Z]+$/)) return "Invalid email";
    if (!this.role) return "No role provided";
    return "";
  };

  User.prototype.submit = function (cb) {
    return $http({
      method: "POST",
      url: "user/createUser",
      data: this,
      params: {
        brandId: JSON.parse(localStorage.getItem("user")).brandId,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then(function (response) {
      cb(response.data);
    });
  };

  return User;
});
