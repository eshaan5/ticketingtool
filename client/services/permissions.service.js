app.service("PermissionsService", function ($http) {
  this.getPermissions = function (role) {
    return $http({
      method: "GET",
      url: `http://localhost:3000/permissions/${role}`,
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    });
  };
});
