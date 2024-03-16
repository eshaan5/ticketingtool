angular.module('myApp').controller('TicketModalController', ['$scope', '$uibModalInstance', 'ticket', function ($scope, $uibModalInstance, ticket) {
    $scope.ticket = angular.copy(ticket); // Make a copy of the ticket object passed from the parent scope
    console.log('Ticket:', $scope.ticket);
    $scope.selectedAgent = null; // Selected agent for assignment
    $scope.newAttachment = null; // New attachment to be added

    // Function to update the ticket details
    $scope.updateTicket = function () {
        // Add logic to update ticket details
        console.log('Updated ticket:', $scope.ticket);
        $uibModalInstance.close();
    };

    // Function to delete the ticket
    $scope.deleteTicket = function () {
        // Add logic to delete ticket
        console.log('Deleted ticket:', $scope.ticket);
        $uibModalInstance.dismiss('delete');
    };

    // Function to close the modal
    $scope.closeModal = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);
