angular.module("myApp").controller("TicketController", [
  "$scope",
  "TicketFieldService",
  "UserService",
  "TicketService",
  "$location",
  "$uibModal", // Inject the $uibModal service
  "TicketFactory", // Inject the "TicketFactory" service
  function ($scope, TicketFieldService, UserService, TicketService, $location, $uibModal, TicketFactory) {
    if (!localStorage.getItem("token")) {
      $location.path("/");
    }

    $scope.back = function () {
      $location.path("/agent");
    };

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
    $scope.viewLogs($scope.currentPage);
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

    UserService.getUsers().then(function (response) {
      $scope.agents = response.data
        .filter(function (user) {
          return user.role == "agent";
        })
        .map(function (agent) {
          return { agentId: agent._id, agentName: agent.name };
        });
    });

    $scope.toggleEditMode = function () {
      $scope.editMode = !$scope.editMode;
    };

    $scope.onFileChange = function (files) {
      $scope.ticket.newAttachments = files;
    };

    // Function to update the ticket details
    $scope.updateTicket = function (selectedAgentId) {
      // Add logic to update ticket details
      var formData = new FormData();
      console.log($scope.ticket);

      var newAgentName = $scope.agents.find(function (agent) {
        return agent.agentId == selectedAgentId;
      }).agentName;

      $scope.ticket.assignedTo = { agentId: selectedAgentId, agentName: newAgentName };

      var ticket = new TicketFactory($scope.ticket);
      ticket.updateTicket(function (response) {
        console.log("Updated ticket:", response);
        $location.path("/agent");
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
