// angular/controllers/CreateTicketModalController.js
angular.module('myApp').controller('CreateTicketModalController', ['$scope', '$uibModalInstance', 'TicketFieldService', 'TicketService', function ($scope, $uibModalInstance, TicketFieldService, TicketService) {
    $scope.newTicket = {}

    TicketFieldService.getTicketTypes().then(function (response) {
        $scope.ticketTypes = response.data;
    });

    TicketFieldService.getTicketRelations().then(function (response) {
        $scope.ticketRelations = response.data;
    });

    $scope.createTicket = function () {
        var formData = new FormData();
        formData.append('title', $scope.newTicket.title);
        formData.append('source', $scope.newTicket.source);
        formData.append('type', $scope.newTicket.type);
        formData.append('relatedTo', $scope.newTicket.relatedTo);
        formData.append('priority', $scope.newTicket.priority);
        formData.append('description', $scope.newTicket.description);
        formData.append('clientDetails.name', $scope.newTicket.clientName);
        formData.append('clientDetails.email', $scope.newTicket.clientEmail);
        formData.append('clientDetails.phone', $scope.newTicket.clientNumber);
        
        // Append files
        var files = document.getElementById('attachments').files;
        for (var i = 0; i < files.length; i++) {
            formData.append('attachments', files[i]);
        }

        TicketService.createTicket(formData).then(function (response) {
            $uibModalInstance.close(response.data);
        });
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);
