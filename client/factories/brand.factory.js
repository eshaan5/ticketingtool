app.factory("BrandFactory", function ($http) {
  function Brand(brand) {
    this.name = brand.name;
    this.email = brand.email;
    this.brandEmail = brand.brandEmail;
    this.password = brand.password;
  }

  Brand.prototype.checkError = function () {
    if (!this.name) return "No name provided";
    if (!this.email) return "No email provided";
    if (!this.email.match(/^[a-zA-Z\d][^\s@]+@[^\s@]+\.[a-zA-Z]+$/)) return "Invalid email";
    if (!this.brandEmail) return "No brand email provided";
    if (!this.brandEmail.match(/^[a-zA-Z\d][^\s@]+@[^\s@]+\.[a-zA-Z]+$/)) return "Invalid brand email";
    if (!this.password) return "No password provided";
    return "";
  };

  Brand.prototype.submit = function (cb) {
    $http({
      method: "POST",
      url: "brand/createBrand",
      data: this,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then(function (response) {
      cb(response.data);
    });
  };

    return Brand;
});
