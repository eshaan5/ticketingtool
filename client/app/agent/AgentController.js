app.controller("AgentController", function ($location, AgentService, $scope, $uibModal, TicketService) {
  // Controller logic for signup page
  $scope.show = false;

  if (localStorage.getItem("time") && new Date().getTime() - localStorage.getItem("time") > 3600000) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("time");

    alert("Session expired. Please login again.");
    $location.path("/");
  }

  if (JSON.parse(localStorage.getItem("user")).role === "user" || JSON.parse(localStorage.getItem("user")).role === "superAdmin") {
    $location.path("/");
  }

  if (!JSON.parse(localStorage.getItem("user")).name) {
    $scope.show = true;
  }

  $scope.agent = JSON.parse(localStorage.getItem("user"));

  $scope.tickets = [];

  TicketService.getTickets()
    .then(function (response) {
      $scope.tickets = response.data;
    })
    .catch(function (err) {
      console.log(err);
    });

  $scope.toggleOnlineStatus = function () {
    // Update the online status for the agent
    $scope.agent.isOnline = !$scope.agent.isOnline;

    // Call the service to update the status on the server
    AgentService.updateOnlineStatus()
      .then(function (response) {
        localStorage.setItem("user", JSON.stringify(response.data.result));
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  $scope.openCreateTicketModal = function () {
    var modalInstance = $uibModal.open({
      templateUrl: "createTicketModal.html", // Template URL of the modal
      controller: "CreateTicketModalController", // Controller for the modal
      size: "lg", // Size of the modal
    });

    // Handle modal close/dismiss events if needed
    modalInstance.result.then(
      function (selectedItem) {
        // Handle modal close
        $scope.tickets.push(selectedItem);
      },
      function () {
        // Handle modal dismiss
        console.log("Modal dismissed");
      }
    );
  };

  // Function to close the create ticket modal
  $scope.closeCreateTicketModal = function () {
    // Close the modal using $uibModalInstance
    console.log("Close the modal");
    modalInstance.close();
  };

  $scope.logout = function () {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    $location.path("/");
  };
});
