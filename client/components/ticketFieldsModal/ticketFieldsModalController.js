angular.module("myApp").controller("TicketFieldsModalController", function ($scope, $uibModalInstance, modalType, TicketFieldService) {
  $scope.modalType = modalType;
  $scope.formData = {};

  $scope.submitForm = function () {
    console.log($scope.field, $scope.fieldForm.field);
    // TicketFieldService.addTicketField({name: $scope.name}, modalType).then(function (response) {
    //   console.log(response);
    // });
  };

  $scope.save = function () {
    TicketFieldService.addTicketField($scope.formData, modalType).then(function (response) {
      console.log(response);
    });
    $uibModalInstance.close($scope.formData);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss("cancel");
  };
});
