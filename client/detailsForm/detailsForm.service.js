app.service("DetailsFormService", function ($http) {
  // Service logic for signup page
  this.updateUser = function (formData) {
    return $http({
      method: "POST",
      url: "http://localhost:3000/user/updateUser",
      data: formData,
      params: { id: JSON.parse(localStorage.getItem("user"))._id },
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  };

  this.updateBrand = function (formData) {
    return $http({
      method: "POST",
      url: "http://localhost:3000/brand/updateBrand",
      data: formData,
      params: { id: JSON.parse(localStorage.getItem("user")).brandId },
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  };
});
