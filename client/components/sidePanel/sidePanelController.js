angular.module("myApp").controller("sideBarController", function ($scope, $location, $uibModal, UserService) {
  $scope.showSideBar = true;

  if (localStorage.getItem("brand")) {
    $scope.brand = JSON.parse(localStorage.getItem("brand"));
  }
  $scope.user = JSON.parse(localStorage.getItem("user"));

  $scope.isSuperAdmin = $scope.user.role == "superAdmin";

  $scope.isAdmin = $scope.user.role == "admin";

  $scope.logout = function () {
    UserService.updateUser({ isOnline: false }).then(function (response) {
      localStorage.removeItem("user");
      localStorage.removeItem("brand");
      localStorage.removeItem("time");
      localStorage.removeItem("token");
      $location.path("/");
    });
  };
  $scope.goHome = function () {
    if ($scope.user.role == "superAdmin") $location.path("/superAdmin");
    else if ($scope.user.role == "admin") $location.path("/admin");
    else if ($scope.user.role == "agent") $location.path("/agent");
  };

  $scope.openAddBrandModal = function () {
    var modalInstance = $uibModal.open({
      templateUrl: "/client/components/addBrandModal/addBrandModal.html",
      controller: "addBrandModalCtrl",
      size: "md",
    });

    modalInstance.result.then(function (brand) {
      $scope.brand = brand;
      console.log($scope.brand);
    });
  };
});
