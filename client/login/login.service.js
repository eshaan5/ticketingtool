app.service("LoginService", function ($http) {
  this.login = function (formData) {
    return $http.post("http://localhost:3000/user/login", formData);
  };
});
