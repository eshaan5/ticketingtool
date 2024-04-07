app.controller("SuperAdminController", function ($scope, $location, $timeout, BrandService, $route, $uibModal) {

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

  $scope.currentPage = 1;
  $scope.pageSize = 10;

  // Load brands data initially
  loadBrands();

  // Function to load brands data with pagination
  function loadBrands() {
    BrandService.getBrands($scope.currentPage, $scope.pageSize).then(function (response) {
      $scope.brands = response.data.brands;
      $scope.totalBrands = response.data.total;
    });
  }

  // Handle page change
  $scope.pageChanged = function () {
    loadBrands();
  };

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

  $scope.openBrandAdminModal = function (brandId) {
    var modalInstance = $uibModal.open({
      templateUrl: '/client/components/brandAdminsModal/brandAdminsModal.html',
      controller: 'BrandAdminsModalController',
      resolve: {
        brandId: function () {
          return brandId;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      // Handle modal close event if needed
    }, function () {
      // Handle modal dismiss event if needed
    });
  };
});
