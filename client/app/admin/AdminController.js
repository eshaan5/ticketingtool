app.controller("AdminController", function ($scope, $location, AdminService, BrandService, $route, $uibModal, UserService) {
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

  if (JSON.parse(localStorage.getItem("user")).role === "user" || JSON.parse(localStorage.getItem("user")).role === "superAdmin") {
    $location.path("/");
  }

  if (!JSON.parse(localStorage.getItem("user")).name) {
    $scope.show = true;
  }

  BrandService.getBrand(JSON.parse(localStorage.getItem("user")).brandId).then(function (response) {
    if (!response.data.logo) {
      $scope.noLogo = true;
    } else {
      $scope.noLogo = false;
    }
  });

  $scope.brand = JSON.parse(localStorage.getItem("brand"));

  UserService.getAgents().then(function (response) {
    $scope.agents = response.data;
  });

  $scope.logout = function () {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    $location.path("/");
  };

  $scope.openFieldModal = function (modalType) {
    var modalInstance = $uibModal.open({
        templateUrl: 'fieldModal.html', // Template URL of the modal
        controller: 'TicketFieldsModalController', // Controller for the modal
        resolve: {
            modalType: function () {
                return modalType; // Pass the modal type to the modal controller
            }
        }
    });

    modalInstance.result.then(function (result) {
        // Handle modal close or dismiss if needed
        console.log('Modal closed with:', result);
    }, function () {
        // Handle modal dismiss if needed
        console.log('Modal dismissed');
    });
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
