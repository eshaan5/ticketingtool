app.controller("SuperAdminController", function ($scope, $location, $timeout, BrandService, $route) {

  $scope.formData = {}; // Initialize form data object
  $scope.show = false;
  $scope.brands = [];

  if (localStorage.getItem('time') && new Date().getTime() - localStorage.getItem('time') > 3600000) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('time');

    alert('Session expired. Please login again.');
    $location.path('/');
  }

  if (JSON.parse(localStorage.getItem("user")).role === "user" || JSON.parse(localStorage.getItem("user")).role === "agent") {
    $location.path("/login");
  }

  BrandService.getBrands().then(function (response) {
    $scope.brands = response.data;
  });

  $scope.logout = function () {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("brand");
    $location.path("/");
  };

  function showToast () {
    $scope.show = true;
    $timeout(function () {
      $scope.show = false;
    }, 3000);
  };

  $scope.submitForm = function () {
    // Handle form submission here
    if ($scope.addBrandForm.$invalid) {
      return;
    }
    BrandService.addBrand($scope.formData).then(function (response) {
      $scope.brands.push(response.data.result);
      $route.reload();
      showToast();
    });
  };

  $scope.disableBrand = function (id, brand) {
    $scope.brands[$scope.brands.indexOf(brand)].isDisabled = !brand.isDisabled;
    BrandService.disableBrand(id, brand).then(function (response) {
      console.log(response);
    });
  };
});
