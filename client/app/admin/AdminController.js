app.controller("AdminController", function ($scope, $location, $timeout, AdminService, $route) {
  // Controller logic for signup page
  $scope.formData = {}; // Initialize form data object
  $scope.show = false;
  $scope.agents = [];

  if (localStorage.getItem("time") && new Date().getTime() - localStorage.getItem("time") > 3600000) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("time");

    alert("Session expired. Please login again.");
    $location.path("/");
  }

  if (JSON.parse(localStorage.getItem("user")).role === "user" || JSON.parse(localStorage.getItem("user")).role === "superAdmin"){
    $location.path("/");
  }

  if (!JSON.parse(localStorage.getItem("user")).name) {
    $scope.show = true;
  }

  AdminService.getAgents().then(function (response) {
    $scope.agents = response.data;
  });

  $scope.logout = function () {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    $location.path("/");
  };

  $scope.submitForm = function () {
    // Handle form submission here
    if ($scope.addAgentForm.$invalid) {
      return;
    }
    console.log($scope.formData);
    AdminService.addAgent($scope.formData).then(function (response) {
      $scope.agents.push(response.data.result);
      $route.reload();
    });
  };
});
