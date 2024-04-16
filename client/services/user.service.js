app.service("UserService", function ($http) {
  // Service logic for signup page
  this.updateUser = function (formData) {
    return $http({
      method: "PUT",
      url: "user/updateUser",
      data: formData,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  };

  this.getUsers = function (currentPage, pageSize) {
    return $http({
      method: "GET",
      url: "user/allUsers" + "?page=" + currentPage + "&limit=" + pageSize,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  };

  this.addUser = function (formData) {
    return $http({
      method: "POST",
      url: "user/createUser",
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

  this.getAdmins = function (brandId) {
    return $http({
      method: "GET",
      url: "user/getAdmins?brandId=" + brandId,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  };

  this.changePassword = function (formData) {
    return $http({
      method: "POST",
      url: "user/changePassword",
      data: formData,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  };

  this.disableUser = function (id, user) {
    return $http({
      method: "PUT",
      url: "user/disableUser/" + id,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: { isDisabled: user.isDisabled },
    });
  };

  this.getAgents = function () {
    return $http({
      method: "GET",
      url: "user/getAgents",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  };
});
