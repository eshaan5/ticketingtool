angular.module('myApp').controller('PendingRequestsController', ['$scope', '$uibModalInstance', 'requests', "RequestService", "$route", // Inject the "RequestService" service
  function($scope, $uibModalInstance, requests, RequestService, $route) {
    $scope.requests = requests;
    console.log(requests);

    $scope.acceptRequest = function(requestId) {
        RequestService.manipulateRequest(requestId, "accept")
        .then(function(response) {
            console.log(response.data);
            $scope.requests = $scope.requests.filter(function(request) {
                return request._id !== requestId;
            });
        })
        .catch(function(err) {
            console.log(err);
        });
    }

    $scope.rejectRequest = function(requestId) {
        RequestService.manipulateRequest(requestId, "reject")
        .then(function(response) {
            console.log(response.data);
            $scope.requests = $scope.requests.filter(function(request) {
                return request._id !== requestId;
            });
        })
        .catch(function(err) {
            console.log(err);
        });
    }

    $scope.closeModal = function() {
      $uibModalInstance.dismiss('cancel');
      $route.reload();
    };
  }
]);
