// angular/controllers/CreateTicketModalController.js
angular.module("myApp").controller("CreateTicketModalController", [
  "$scope",
  "$uibModalInstance",
  "TicketFieldService",
  "TicketFactory",
  "$timeout",
  function ($scope, $uibModalInstance, TicketFieldService, TicketFactory, $timeout) {
    $scope.newTicket = {};
    $scope.error = "";

    TicketFieldService.getTicketTypes().then(function (response) {
      $scope.ticketTypes = response.data;
    });

    TicketFieldService.getTicketRelations().then(function (response) {
      $scope.ticketRelations = response.data;
    });

    $scope.createTicket = function () {

      var ticket = new TicketFactory($scope.newTicket);
      $scope.error = ticket.checkError($scope.ticketTypes, $scope.ticketRelations);

      if (!$scope.error) {
        ticket.submitTicket(function (response) {
          $uibModalInstance.close(response);
          $scope.$parent.successMessage = "Ticket created successfully!";
          $scope.$parent.showSuccess = true;
          $timeout(function () {
            $scope.$parent.showSuccess = false;
          }, 3000);
        });
      }
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss("cancel");
    };
  },
]);
