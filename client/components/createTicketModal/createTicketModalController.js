// angular/controllers/CreateTicketModalController.js
angular.module("myApp").controller("CreateTicketModalController", [
  "$scope",
  "$uibModalInstance",
  "TicketFieldService",
  "TicketFactory",
  "$timeout",
  function ($scope, $uibModalInstance, TicketFieldService, TicketFactory, $timeout) {
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
        $scope.$parent.successMessage = "Ticket created successfully!";
        $scope.$parent.showSuccess = true;
        $timeout(function () {
          $scope.$parent.showSuccess = false;
        }, 3000);
      });
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss("cancel");
    };
  },
]);
