app.service("UserService", function ($http) {
  // Service logic for signup page
  this.updateUser = function (formData) {
    return $http({
      method: "PUT",
      url: "http://localhost:3000/user/updateUser",
      data: formData,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  };

  this.getUsers = function () {
    return $http({
      method: "GET",
      url: "http://localhost:3000/user/allUsers",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  };

  this.addUser = function (formData) {
    return $http({
      method: "POST",
      url: "http://localhost:3000/user/createUser",
      data: formData,
      params: {
        brandId: JSON.parse(localStorage.getItem("user")).brandId,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  };
});
