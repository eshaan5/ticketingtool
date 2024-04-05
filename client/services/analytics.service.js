app.service("AnalyticsService", function ($http) {
  this.getAnalytics = function (startDate, endDate, page1, page2) {
    var url;
    if (!page2) url = `analytics?startDate=${startDate}&endDate=${endDate}&page1=${page1}`;
    else url = `analytics?startDate=${startDate}&endDate=${endDate}&page1=${page1}&page2=${page2}`;
    return $http({
      method: "GET",
      url: url,
    });
  };
});
