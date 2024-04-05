app.service("BrandService", function ($http) {
  // Service logic for signup page
  this.addBrand = function (formData) {
    return $http({
      method: "POST",
      url: "brand/createBrand",
      data: formData,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  };

  this.getBrands = function (currentPage, pageSize) {
    return $http({
      method: "GET",
      url: "brand/allBrands" + "?page=" + currentPage + "&limit=" + pageSize,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  };

  this.disableBrand = function (id, brand) {
    return $http({
      method: "PUT",
      url: "brand/disableBrand/" + id,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: { isDisabled: brand.isDisabled },
    });
  };

  this.getBrand = function (id) {
    return $http({
      method: "GET",
      url: "brand/getBrand/" + id,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  };

  this.updateBrand = function (formData) {
    return $http({
      method: "PUT",
      url: "brand/updateBrand",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: formData,
    });
  };
});
