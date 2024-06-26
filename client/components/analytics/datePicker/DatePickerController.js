app.controller("DatePickerController", [
  "$scope",
  "AnalyticsService",
  function ($scope) {
    // AnalyticsService.getAnalytics($scope.startDate, $scope.endDate).then(function (response) {
    //   $scope.analyticsData = response.data;
    //   console.log($scope.analyticsData);
    // });

    function lastMonthDate() {
      var date = new Date();
      date.setMonth(date.getMonth() - 1);
      return date;
    }

    $scope.startDate = lastMonthDate();
    $scope.endDate = new Date();

    $scope.getAnalytics(1, 1, $scope.startDate, $scope.endDate);

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
        $scope.getAnalytics(1, 1, $scope.startDate, $scope.endDate);
      }
    };
  },
]);
