app.controller("LoginController", function ($scope, $location, LoginService) {
  if (localStorage.getItem("token")) {
    $location.path("/users");
  }

  // Controller logic for login page
  $scope.formData = {}; // Initialize form data object
  $scope.login = function () {
    LoginService.login($scope.formData).then(function (response) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.result));
      localStorage.setItem("time", new Date().getTime());
      if (response.data.result.role == "user") {
        alert("You are logged in as a user");
        return;
      }
      $location.path("/superAdmin");
    });

    // Retrieve user from IndexedDB
  };
});
