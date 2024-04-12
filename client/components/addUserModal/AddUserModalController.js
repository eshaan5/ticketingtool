app.controller("AddUserModalController", function ($scope, $uibModalInstance, PermissionsService, $route, UserFactory) {
  $scope.roles = ["admin", "agent"];
  $scope.formData = {};

  $scope.loadPermissions = function (role) {
    PermissionsService.getPermissions(role).then(function (response) {
      $scope.permissions = response.data;
      $scope.formData.permissions = response.data;
    });
  };

  $scope.submitForm = function (form) {
    if (form.$invalid) {
      return;
    }

    var user = new UserFactory($scope.formData);
    $scope.error = user.checkError();
    if (!$scope.error) {
      user.submit(function (response) {
        $uibModalInstance.close(response);
        $route.reload();
      });
    }
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss("cancel");
  };
});
