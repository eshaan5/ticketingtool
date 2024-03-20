app.controller("LoginController", function ($scope, $location, LoginService) {
  // if (localStorage.getItem("token") && localStorage.getItem("time") && new Date().getTime() - localStorage.getItem("time") < 3600000) {
  //   $location.path("/superAdmin");
  // }

  // Controller logic for login page
  $scope.formData = {}; // Initialize form data object
  $scope.login = function () {
    LoginService.login($scope.formData).then(function (response) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.result));
      localStorage.setItem("time", new Date().getTime());
      if (response.data.brand)
      localStorage.setItem("brand", JSON.stringify(response.data.brand));

      if (response.data.result.role == "admin") {
        $location.path("/admin");
        return;
      }

      if (response.data.result.role == "agent") {
        $location.path("/agent");
        return;
      }

      $location.path("/superAdmin");
    })
    .catch(function (err) {
      $scope.error = err.data.message;
    });

    // Retrieve user from IndexedDB
  };
});
