// angular/controllers/CreateTicketModalController.js
angular.module('myApp').controller('CreateTicketModalController', ['$scope', '$uibModalInstance', 'TicketFieldService', function ($scope, $uibModalInstance, TicketFieldService) {
    $scope.newTicket = {}

    TicketFieldService.getTicketTypes().then(function (response) {
        $scope.ticketTypes = response.data;
        console.log($scope.ticketTypes);
    });

    TicketFieldService.getTicketRelations().then(function (response) {
        $scope.ticketRelations = response.data;
    });

    $scope.createTicket = function () {
        // Call the service to create the ticket
        console.log($scope.newTicket);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);
