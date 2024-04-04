app.controller("DatePickerController", [
  "$scope",
  "AnalyticsService",
  function ($scope, AnalyticsService) {
    $scope.endDate = new Date();
    $scope.startDate = new Date();

    // AnalyticsService.getAnalytics($scope.startDate, $scope.endDate).then(function (response) {
    //   $scope.analyticsData = response.data;
    //   console.log($scope.analyticsData);
    // });

    $scope.openStartDatePopup = function ($event) {
      $scope.startDatePopupOpen = true;
    };

    $scope.openEndDatePopup = function ($event) {
      $scope.endDatePopupOpen = true;
    };

    $scope.verifyDates = function () {
      $scope.showDateWarning = false;
      $scope.dateWarningMessage = "";

      if ($scope.startDate && $scope.endDate) {
        var currentDate = new Date();
        var startDate = new Date($scope.startDate);
        var endDate = new Date($scope.endDate);

        if (endDate > currentDate) {
          $scope.showDateWarning = true;
          $scope.dateWarningMessage = "End date cannot be after the current date.";
        } else if (startDate > endDate) {
          $scope.showDateWarning = true;
          $scope.dateWarningMessage = "Start date cannot be after the end date.";
        }
      }

      if (!$scope.showDateWarning) {
        $scope.charts.forEach(function (chart) {
          chart.destroy();
        });

        $scope.getAnalytics($scope.startDate, $scope.endDate);
      }
    };
  },
]);
