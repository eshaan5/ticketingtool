app.service("AgentService", function ($http) {
  // Service logic for user management
  this.updateOnlineStatus = function (user) {
    // Update the user details
    return $http({
      method: "GET",
      url: "http://localhost:3000/user/updateOnlineStatus",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  };
});