app.controller("LoginController", function ($scope, $location, LoginService) {
  
  $scope.formData = {}; // Initialize form data object
  $scope.login = function () {
    LoginService.login($scope.formData).then(function (response) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.result));
      localStorage.setItem("time", new Date().getTime());
      if (response.data.brand)
      localStorage.setItem("brand", JSON.stringify(response.data.brand));

      if (response.data.result.role == "admin") {
        $location.replace("/admin");
        $location.path("/admin");
        return;
      }

      if (response.data.result.role == "agent") {
        $location.replace("/agent");
        $location.path("/agent");
        return;
      }

      $location.replace("/superAdmin");
      $location.path("/superAdmin");
    })
    .catch(function (err) {
      $scope.error = err.data.message;
    });
  };
});
