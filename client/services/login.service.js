app.service("LoginService", function ($http) {
  this.login = function (formData) {
    return $http({
      method: "POST",
      url: "user/login",
      data: formData,
      headers: {
        Authorization: null,
      },
    });
  };
});
