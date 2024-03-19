angular.module('myApp').controller('PendingRequestsController', ['$scope', '$uibModalInstance', 'requests',
  function($scope, $uibModalInstance, requests) {
    $scope.requests = requests;
    console.log(requests);

    $scope.closeModal = function() {
      $uibModalInstance.dismiss('cancel');
    };
  }
]);
