// angular/controllers/CreateTicketModalController.js
angular.module('myApp').controller('CreateTicketModalController', ['$scope', function ($scope) {
    $scope.newTicket = {}

    $scope.createTicket = function () {
        // Call the service to create the ticket
        console.log($scope.newTicket);
        console.log($scope.$parent.agent);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);
