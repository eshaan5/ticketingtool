angular.module("myApp").controller("TicketController", [
  "$scope",
  "TicketFieldService",
  "UserService",
  "TicketService",
  "$location",
  "$uibModal", // Inject the $uibModal service
  function ($scope, TicketFieldService, UserService, TicketService, $location, $uibModal) {
    $scope.ticket = JSON.parse($location.search().ticket); // Make a copy of the ticket object passed from the parent scope
    $scope.newAttachment = null; // New attachment to be added

    $scope.editMode = true;
    $scope.selectedAgentId = $scope.ticket.assignedTo.agentId;
    $scope.showLogs = false;
    $scope.currentPage = 1;
    $scope.pageSize = 5; // Number of logs per page

    $scope.viewLogs = function (currPage) {
      TicketService.getLogs($scope.ticket.ticketId, currPage, $scope.pageSize)
        .then(function (response) {
          $scope.logs = response.data.logs;
          $scope.totalLogs = response.data.total;
          $scope.showLogs = true;
        })
        .catch(function (err) {
          console.log(err);
        });
    };
    // Fetch logs for the ticket

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

      for (var key in $scope.ticket) {
        if (key == "attachments") continue;
        if (key == "assignedTo") continue;
        if (key == "clientDetails") continue;
        formData.append(key, $scope.ticket[key]);
      }
      formData.append("attachments", JSON.stringify($scope.ticket.attachments));
      formData.append("assignedTo", JSON.stringify({ agentId: selectedAgentId, agentName: newAgentName }));
      formData.append("clientDetails", JSON.stringify($scope.ticket.clientDetails));

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

    $scope.openModal = function (log) {
      if (log.action == "create") return;

      var modalInstance = $uibModal.open({
        templateUrl: "logModal.html",
        controller: "LogModalController",
        size: "lg",
        resolve: {
          log: function () {
            return log;
          },
        },
      });

      modalInstance.result.then(
        function (selectedItem) {
          $scope.selected = selectedItem;
        },
        function () {
          console.log("Modal dismissed at: " + new Date());
        }
      );
    };
  },
]);
