angular.module("myApp").controller("TicketModalController", [
  "$scope",
  "$uibModalInstance",
  "ticket",
  "TicketFieldService",
  "UserService",
  "TicketService",
  function ($scope, $uibModalInstance, ticket, TicketFieldService, UserService, TicketService) {
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
      var formData = new FormData();

        formData.append("title", $scope.ticket.title);
        formData.append("source", $scope.ticket.source);
        formData.append("type", $scope.ticket.type);
        formData.append("relatedTo", $scope.ticket.relatedTo);
        formData.append("priority", $scope.ticket.priority);
        formData.append("description", $scope.ticket.description);
        formData.append("clientDetails.name", $scope.ticket.clientDetails.name);
        formData.append("clientDetails.email", $scope.ticket.clientDetails.email);
        formData.append("clientDetails.phone", $scope.ticket.clientDetails.phone);
        formData.append("status", $scope.ticket.status);
        formData.append("assignedTo.agentId", $scope.ticket.assignedTo.agentId);
        formData.append("assignedTo.agentName", $scope.ticket.assignedTo.agentName);
        formData.append("attachments", JSON.stringify($scope.ticket.attachments));
        formData.append("_id", $scope.ticket._id);

        // Append files
        var files = document.getElementById("attachments").files;
        for (var i = 0; i < files.length; i++) {
          formData.append("attachments", files[i]);
        }

        TicketService.updateTicket(formData)
          .then(function (response) {
            console.log("Updated ticket:", response.data);
            $uibModalInstance.close(response.data);
          })
          .catch(function (err) {
            console.log(err);
          });
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
