app.controller("AdminController", function ($scope, $location, BrandService, $uibModal, UserService) {
  if (!localStorage.getItem("token")) {
    $location.path("/login");
  }

  // Controller logic for signup page
  $scope.formData = {}; // Initialize form data object
  $scope.show = false;
  $scope.users = [];

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

  $scope.currentPage = 1;
  $scope.pageSize = 10;

  $scope.brand = JSON.parse(localStorage.getItem("brand"));

  function loadUsers() {
  UserService.getUsers($scope.currentPage, $scope.pageSize).then(function (response) {
    $scope.users = response.data.users;
    $scope.totalUsers = response.data.total;
  });
}

  loadUsers();

  $scope.pageChanged = function () {
    loadUsers();
  };

  $scope.openFieldModal = function (modalType) {
    var modalInstance = $uibModal.open({
      templateUrl: "fieldModal.html", // Template URL of the modal
      controller: "TicketFieldsModalController", // Controller for the modal
      resolve: {
        modalType: function () {
          return modalType; // Pass the modal type to the modal controller
        },
      },
    });

    modalInstance.result.then(
      function (result) {
        // Handle modal close or dismiss if needed
        console.log("Modal closed with:", result);
      },
      function () {
        // Handle modal dismiss if needed
        console.log("Modal dismissed");
      }
    );
  };

  $scope.disableUser = function (id, user) {
    $scope.users[$scope.users.indexOf(user)].isDisabled = !user.isDisabled;
    UserService.disableUser(id, user).then(function (response) {
      console.log(response);
    });
  };
});
