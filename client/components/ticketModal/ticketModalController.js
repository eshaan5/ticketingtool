angular.module("myApp").controller("TicketModalController", [
  "$scope",
  "$uibModalInstance",
  "ticket",
  "TicketFieldService",
  "UserService",
  function ($scope, $uibModalInstance, ticket, TicketFieldService, UserService) {
    $scope.ticket = angular.copy(ticket); // Make a copy of the ticket object passed from the parent scope
    console.log("Ticket:", $scope.ticket);
    $scope.selectedAgent = null; // Selected agent for assignment
    $scope.newAttachment = null; // New attachment to be added

    $scope.editMode = true;
    $scope.selectedAgentId = $scope.ticket.assignedTo ? $scope.ticket.assignedTo.agentId : null;

    TicketFieldService.getTicketTypes().then(function (response) {
      $scope.ticketTypes = response.data.map(function (type) {
        return type.name;
      });
    });

    TicketFieldService.getTicketRelations().then(function (response) {
      $scope.ticketRelations = response.data.map(function (relation) {
        return relation.name;
      });
    });

    UserService.getAgents().then(function (response) {
      $scope.agents = response.data.map(function (agent) {
        return {
          agentId: agent._id,
          agentName: agent.name,
        };
      });
    });

    $scope.$watch("selectedAgentId", function (newAgentId, oldAgentId) {
      if (newAgentId !== oldAgentId) {
        $scope.ticket.assignedTo = $scope.agents.find((agent) => agent._id === newAgentId);
      }
    });

    $scope.toggleEditMode = function () {
      $scope.editMode = !$scope.editMode;
    };

    // Function to update the ticket details
    $scope.updateTicket = function () {
      // Add logic to update ticket details
      console.log("Updated ticket:", $scope.ticket);
      $uibModalInstance.close();
    };

    // Function to delete the ticket
    $scope.deleteTicket = function () {
      // Add logic to delete ticket
      console.log("Deleted ticket:", $scope.ticket);
      $uibModalInstance.dismiss("delete");
    };

    // Function to close the modal
    $scope.closeModal = function () {
      $uibModalInstance.dismiss("cancel");
    };
  },
]);
