// angular/controllers/CreateTicketModalController.js
angular.module('myApp').controller('CreateTicketModalController', ['$scope', '$uibModalInstance', 'agent', 'TicketService', function ($scope, $uibModalInstance, agent, TicketService) {
    $scope.newTicket = {}
    console.log(agent);

    $scope.createTicket = function () {
        // Call the service to create the ticket
        console.log($scope.newTicket);
        $uibModalInstance.close($scope.newTicket); // Close the modal and pass the new ticket data
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);
