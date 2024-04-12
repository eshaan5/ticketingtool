app.controller("addBrandModalCtrl", function ($scope, BrandFactory, $uibModalInstance) {
  $scope.formData = {};
  $scope.submitForm = function () {
    // Handle form submission here
    if ($scope.addBrandForm.$invalid) {
      return;
    }
    
    var brand = new BrandFactory($scope.formData);
    $scope.error = brand.checkError();

    if (!$scope.error) {
      brand.submit(function (response) {
        $uibModalInstance.close(response);
      });
    }
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss("cancel");
  };
});
