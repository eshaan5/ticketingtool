app.service("AnalyticsService", function ($http) {
  this.getAnalytics = function (startDate, endDate) {
    var url = `analytics?startDate=${startDate}&endDate=${endDate}`;
    return $http({
      method: "GET",
      url: url,
    });
  };
});
