angular.module("myApp").controller("TicketController", [
  "$scope",
  "TicketFieldService",
  "UserService",
  "TicketService",
  "$location",
  function ($scope, TicketFieldService, UserService, TicketService, $location) {
    $scope.ticket = JSON.parse($location.search().ticket); // Make a copy of the ticket object passed from the parent scope
    $scope.newAttachment = null; // New attachment to be added

    $scope.editMode = true;
    $scope.selectedAgentId = $scope.ticket.assignedTo.agentId;

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

    $scope.toggleEditMode = function () {
      $scope.editMode = !$scope.editMode;
    };

    // Function to update the ticket details
    $scope.updateTicket = function (selectedAgentId) {
      // Add logic to update ticket details
      var formData = new FormData();
      console.log($scope.ticket);

      var newAgentName = $scope.agents.find(function (agent) {
        return agent.agentId == selectedAgentId;
      }).agentName;

      formData.append("type", $scope.ticket.type);
      formData.append("relatedTo", $scope.ticket.relatedTo);
      formData.append("priority", $scope.ticket.priority);
      formData.append("description", $scope.ticket.description);
      formData.append("status", $scope.ticket.status);
      formData.append("attachments", JSON.stringify($scope.ticket.attachments));
      formData.append("_id", $scope.ticket._id);
      formData.append("assignedTo", JSON.stringify({ agentId: selectedAgentId, agentName: newAgentName }));

      // Append files
      var files = document.getElementById("attachments").files;
      for (var i = 0; i < files.length; i++) {
        formData.append("attachments", files[i]);
      }

      TicketService.updateTicket(formData)
        .then(function (response) {
          console.log("Updated ticket:", response.data);
          $location.path("/agent");
        })
        .catch(function (err) {
          console.log(err);
        });
    };
  },
]);
