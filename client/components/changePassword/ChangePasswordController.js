app.controller("ChangePasswordController", function ($scope, $uibModalInstance, UserService, $timeout) {
  $scope.formData = {};
  $scope.changePassword = function () {
    // Implement change password logic here
    if ($scope.formData.newPassword !== $scope.confirmPassword) {
      console.log($scope.formData.newPassword, $scope.confirmPassword); // (1
      $scope.error = "Passwords do not match";
      return;
    }

    UserService.changePassword($scope.formData)
      .then(function (response) {
        $scope.$parent.successMessage = response.data.message;
        $scope.$parent.showSuccess = true;
        $timeout(function () {
          $scope.$parent.showSuccess = false;
        }, 3000);
        $scope.currentPassword = "";
        $scope.newPassword = "";
        $scope.confirmPassword = "";
        $uibModalInstance.close();
      })
      .catch(function (error) {
        $scope.error = error.data.message;
      });
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss("cancel");
  };
});
