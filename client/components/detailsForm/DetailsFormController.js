app.controller("DetailsFormController", function ($scope, $location, $timeout, BrandService, UserService, $route) {
  // Controller logic for signup page
  $scope.formData = {}; // Initialize form data object

  if (localStorage.getItem("time") && new Date().getTime() - localStorage.getItem("time") > 3600000) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("time");

    alert("Session expired. Please login again.");
    $location.path("/");
  }

  if (JSON.parse(localStorage.getItem("user")).role === "superAdmin") {
    $location.path("/");
  }

  if (JSON.parse(localStorage.getItem("user")).role == "admin") $scope.isAdmin = true;

  $scope.uploadImage = function (files) {
    var reader = new FileReader();

    reader.onload = function (event) {
      $scope.$apply(function () {
        $scope.logo = event.target.result; // Store the image data
      });
    };

    reader.readAsDataURL(files[0]); // Read the file as a data URL
  };

  $scope.hasCredentials = function () {
    return $scope.$parent.noLogo;
  };

  $scope.submitForm = function () {
    // Handle form submission here
    if ($scope.addDetailsForm.$invalid) {
      return;
    }

    if ($scope.isAdmin) {
      var promiseArray = $scope.logo ? [UserService.updateUser($scope.formData), BrandService.updateBrand({ logo: $scope.logo })] : [UserService.updateUser($scope.formData)];

      Promise.all(promiseArray)
        .then(function (responses) {
          localStorage.setItem("user", JSON.stringify(responses[0].data.result));
          $scope.$parent.show = false;
          $route.reload();
        })
        .catch(function (errs) {
          if (errs[0].status != 201) {
            if (errs[0].data.code == 11000) {
              $scope.error = "Username already exists";
            }
          }
        });
    } else {
      UserService.updateUser($scope.formData)
        .then(function (response) {
          localStorage.setItem("user", JSON.stringify(response.data.result));
          $scope.$parent.show = false;
          $route.reload();
        })
        .catch(function (err) {
          if (err.status != 201) {
            if (err.data.code == 11000) {
              $scope.error = "Username already exists";
            }
          }
        });
    }
  };
});
