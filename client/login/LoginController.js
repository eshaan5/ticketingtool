app.controller("LoginController", function ($scope, $location, LoginService) {
  if (localStorage.getItem("token") && localStorage.getItem("time") && new Date().getTime() - localStorage.getItem("time") < 3600000) {
    $location.path("/superAdmin");
  }

  // Controller logic for login page
  $scope.formData = {}; // Initialize form data object
  $scope.login = function () {
    LoginService.login($scope.formData).then(function (response) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.result));
      localStorage.setItem("time", new Date().getTime());
      if (response.data.result.role != "superAdmin" && !response.data.result.name) {
        $location.path("/detailsForm");
        return;
      }

      if (response.data.result.role != "superAdmin" && response.data.result.name) {
        alert("You have already submitted the details form!");
        return;
      }

      $location.path("/superAdmin");
    });

    // Retrieve user from IndexedDB
  };
});
