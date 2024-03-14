// angular/controllers/CreateTicketModalController.js
angular.module('myApp').controller('CreateTicketModalController', ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {
    $scope.newTicket = {}

    $scope.createTicket = function () {
        // Call the service to create the ticket
        console.log($scope.newTicket);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);
