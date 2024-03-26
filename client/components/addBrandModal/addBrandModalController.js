app.controller('addBrandModalCtrl', function($scope, BrandService, $uibModalInstance) {
    $scope.submitForm = function () {
        // Handle form submission here
        if ($scope.addBrandForm.$invalid) {
          return;
        }
        BrandService.addBrand($scope.formData).then(function (response) {
          $uibModalInstance.close(response.data.result);
        });
      };

    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };
});