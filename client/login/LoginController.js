app.controller("LoginController", function ($scope, $location, LoginService) {
  // Controller logic for login page
  $scope.formData = {}; // Initialize form data object
  $scope.login = function () {
    console.log($scope.formData);
    LoginService.login($scope.formData).then(function (response) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.result));
      //$location.path("/");
    });

    // Retrieve user from IndexedDB
  };
});
