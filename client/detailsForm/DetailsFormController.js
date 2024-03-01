app.controller("DetailsFormController", function ($scope, $location, $timeout, DetailsFormService) {
    // Controller logic for signup page
    $scope.formData = {}; // Initialize form data object
    $scope.show = false;
  
    if (localStorage.getItem('time') && new Date().getTime() - localStorage.getItem('time') > 3600000) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('time');
  
      alert('Session expired. Please login again.');
      $location.path('/');
    }
  
    if (JSON.parse(localStorage.getItem("user")).role === "superAdmin") {
      $location.path("/");
    }

    if (JSON.parse(localStorage.getItem("user")).role == "admin")
    $scope.isAdmin = true;
  
    $scope.logout = function () {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      $location.path("/");
    };
  
    function showToast () {
      $scope.show = true;
      $timeout(function () {
        $scope.show = false;
      }, 3000);
    };

    $scope.uploadImage = function (files) {
        var reader = new FileReader();
    
        reader.onload = function (event) {
          $scope.$apply(function () {
            $scope.logo = event.target.result; // Store the image data
          });
        };
    
        reader.readAsDataURL(files[0]); // Read the file as a data URL
      };
  
    $scope.submitForm = function () {
      // Handle form submission here
      if ($scope.addDetailsForm.$invalid) {
        return;
      }
      Promise.all([
        DetailsFormService.updateUser($scope.formData),
        DetailsFormService.updateBrand({logo: $scope.logo})
      ]).then(function (responses) {
        showToast();
      });
    };
  });
  