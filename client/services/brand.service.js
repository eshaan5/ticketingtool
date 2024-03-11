app.service("BrandService", function ($http) {
  // Service logic for signup page
  this.addBrand = function (formData) {
    return $http({
      method: "POST",
      url: "http://localhost:3000/brand/createBrand",
      data: formData,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  };

  this.getBrands = function () {
    return $http({
      method: "GET",
      url: "http://localhost:3000/brand/allBrands",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  };

  this.disableBrand = function (id, brand) {
    return $http({
      method: "PUT",
      url: "http://localhost:3000/brand/disableBrand/" + id,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: { isDisabled: brand.isDisabled }
    });
  };
});
