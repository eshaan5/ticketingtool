app.service("PermissionsService", function ($http) {
  this.getPermissions = function (role) {
    return $http({
      method: "GET",
      url: `permissions/${role}`,
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    });
  };
});
