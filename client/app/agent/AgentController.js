app.controller("AgentController", function ($scope, $location, AgentService, $uibModal, $document) {
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
    const modalInstance = $uibModal.open({
      animation: true,
      templateUrl: "/client/components/createTicketModal/createTicketModal.html",
      controller: "CreateTicketModalController", // CreateTicketModalController should be implemented
      resolve: {
        // Pass any necessary data to the modal controller
        agent: function () {
          return $scope.agent; // Passing the first agent as an example
        },
      },
      appendTo: angular.element($document[0].querySelector("#createTicketModal")),
    });

    console.log(modalInstance.result)

    // Handle modal close/dismiss events if needed
    modalInstance.result.then(
      function (newTicket) {
        // Handle the new ticket (if any) returned from the modal
        console.log("New ticket created:", newTicket);
      },
      function () {
        // Modal dismissed/closed without creating a ticket
        console.log("Create ticket modal dismissed");
      }
    )
    .catch(function (err) {
      console.log(err);
    });
  };

  $scope.logout = function () {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    $location.path("/");
  };
});
