// angular/controllers/CreateTicketModalController.js
angular.module("myApp").controller("CreateTicketModalController", [
  "$scope",
  "$uibModalInstance",
  "TicketFieldService",
  "TicketFactory",
  function ($scope, $uibModalInstance, TicketFieldService, TicketFactory) {
    $scope.newTicket = {};

    TicketFieldService.getTicketTypes().then(function (response) {
      $scope.ticketTypes = response.data;
    });

    TicketFieldService.getTicketRelations().then(function (response) {
      $scope.ticketRelations = response.data;
    });

    $scope.createTicket = function () {
      TicketFactory.create($scope.newTicket, function (response) {
        $uibModalInstance.close(response);
      });
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss("cancel");
    };
  },
]);
