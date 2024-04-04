app.service("AnalyticsService", function ($http) {
  this.getAnalytics = function (startDate, endDate, page, pageSize) {
    var url = `analytics?startDate=${startDate}&endDate=${endDate}&page=${page}&pageSize=${pageSize}`;
    return $http({
      method: "GET",
      url: url,
    });
  };
});
