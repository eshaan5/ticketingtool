app.controller("AddUserModalController", function ($scope, $uibModalInstance, PermissionsService, UserService, $route) {
  $scope.roles = ["admin", "agent"];
  $scope.formData = {};

  $scope.loadPermissions = function (role) {
    PermissionsService.getPermissions(role).then(function (response) {
      $scope.permissions = response.data;
      $scope.formData.permissions = response.data;
    });
  };

  $scope.submitForm = function () {
    UserService.addUser($scope.formData).then(function (response) {
      $uibModalInstance.close(response.data.result);
    });
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss("cancel");
  };
});
