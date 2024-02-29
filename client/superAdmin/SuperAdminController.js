app.controller("SuperAdminController", function ($scope, $location, $timeout, SuperAdminService, $route) {
  // Controller logic for signup page
  $scope.formData = {}; // Initialize form data object
  $scope.confirmPassword;
  $scope.arePasswordsEqual = true;
  $scope.usernameExists = false;
  $scope.show = false;
  $scope.brands = [];

  if (localStorage.getItem('time') && new Date().getTime() - localStorage.getItem('time') > 3600000) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('time');

    alert('Session expired. Please login again.');
    $location.path('/login');
  }

  if (JSON.parse(localStorage.getItem("user")).role === "user") {
    $location.path("/login");
  }

  SuperAdminService.getBrands().then(function (response) {
    $scope.brands = response.data;
  });

  $scope.logout = function () {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    $location.path("/");
  };

  function showToast () {
    $scope.show = true;
    console.log($scope.show);
  };

  $scope.confirm = function () {
    if ($scope.formData.password !== $scope.confirmPassword) {
      $scope.arePasswordsEqual = false;
      $scope.addBrandForm.$invalid = true;
    } else {
      $scope.arePasswordsEqual = true;
      $scope.addBrandForm.$invalid = false;
    }
  };

  $scope.submitForm = function () {
    // Handle form submission here
    if ($scope.addBrandForm.$invalid) {
      return;
    }
    SuperAdminService.addBrand($scope.formData).then(function (response) {
      $scope.brands.push(response.data.result);
      $route.reload();
    });
  };
});
