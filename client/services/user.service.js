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

  this.getAgents = function () {
    return $http({
      method: "GET",
      url: "http://localhost:3000/user/allAgents",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  };
});
