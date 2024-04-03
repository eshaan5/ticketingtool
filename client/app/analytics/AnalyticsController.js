app.controller("AnalyticsController", function($scope, AnalyticsService, $location) {
    $scope.role = JSON.parse(localStorage.getItem("user")).role;
    AnalyticsService.getAnalytics().then(function(response) {
        $scope.analyticsData = response.data;
        console.log($scope.analyticsData);
    });
})