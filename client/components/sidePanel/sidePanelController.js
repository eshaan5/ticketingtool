angular.module("myApp").controller("sideBarController", function ($scope, $location, $uibModal, $timeout) {
  var currUser = JSON.parse(localStorage.getItem("currentUser")) ?? "";
  $scope.userDetails = {
    name: currUser.userName,
    email: currUser.email,
    contact: currUser.contact,
    role: currUser.role,
  };
  $scope.showSideBar = true;

  $scope.brand = JSON.parse(localStorage.getItem("brand"));
  $scope.user = JSON.parse(localStorage.getItem("user"));

  $scope.logout = function () {
      localStorage.removeItem("user");
      localStorage.removeItem("brand");
      localStorage.removeItem("time");
      $location.path("/");
  };
  $scope.goHome = function () {

    if ($scope.user.role == "superAdmin") $location.path("/superAdmin");
    else if ($scope.user.role == "admin") $location.path("/admin");
    else if ($scope.user.role == "agent") $location.path("/agent");
  };

  $scope.changePass = function () {
    var modalInstance = $uibModal.open({
      animation: true,
      ariaLabelledBy: "modal-title",
      ariaDescribedBy: "modal-body",
      templateUrl: "/FrontEnd/Components/passwordModal/passwordModal.html",
      controller: "ModalInstancePassword",
      size: "sm",
    });

    modalInstance.result
      .then(
        function (response) {
          $scope.showSuccess = true;
          $scope.successMessage = response.message;
          $timeout(function () {
            $scope.showSuccess = false;
          }, 1500);
        },
        function () {
          console.log("no reason");
        }
      )
      .catch(function (err) {
        console.log(err);
      });
  };
});
