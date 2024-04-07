app.controller("BrandAdminsModalController", function ($scope, $uibModalInstance, BrandService, brandId, UserService, PermissionsService) {
  $scope.admins = [];
  $scope.roles = ["admin"];
  $scope.formData = {};

  $scope.loadPermissions = function (role) {
    PermissionsService.getPermissions(role).then(function (response) {
      $scope.permissions = response.data;
      $scope.formData.permissions = response.data;
    });
  };

  $scope.submitForm = function () {
    UserService.addUser($scope.formData).then(function (response) {
      $scope.admins.push(response.data.result);
    });
  };

  // Function to load admins for the brand
  function loadAdmins() {
    UserService.getAdmins(brandId).then(function (response) {
      $scope.admins = response.data;
      console.log(response);
    });
  }

  // Load admins initially
  loadAdmins();

  // Function to add a new admin
  $scope.addAdmin = function () {
    // Implement adding admin functionality
  };

  // Function to close the modal
  $scope.closeModal = function () {
    $uibModalInstance.dismiss("cancel");
  };
});
