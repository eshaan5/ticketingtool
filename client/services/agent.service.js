app.service("AgentService", function ($http) {
  // Service logic for user management
  this.updateOnlineStatus = function (user) {
    // Update the user details
    return $http({
      method: "GET",
      url: "user/updateOnlineStatus",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  };

  this.getPendingRequests = function () {
    // Get the pending requests for the agent
    return $http({
      method: "GET",
      url: "pendingRequests",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  };
});