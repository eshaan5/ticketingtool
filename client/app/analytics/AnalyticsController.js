app.controller("AnalyticsController", function ($scope, AnalyticsService, $location) {
  $scope.role = JSON.parse(localStorage.getItem("user")).role;
  // AnalyticsService.getAnalytics().then(function(response) {
  //     $scope.analyticsData = response.data;
  //     console.log($scope.analyticsData);
  // });
  $scope.analyticsData = {};
  $scope.charts = [];
  function renderPieChart(canvasId, data) {

    var ctx = document.getElementById(canvasId).getContext("2d");
    var chart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: data.map(function (item) {
          return item._id;
        }),
        datasets: [
          {
            data: data.map(function (item) {
              return item.count;
            }),
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#8BC34A"],
          },
        ],
      },
      options: {
        responsive: true,
        // maintainAspectRatio: false,
      },
    });
    $scope.charts.push(chart);
  }
  $scope.generatePieCharts = function (data) {
    // Fetch data from the backend and render the pie charts
    // Example data for demonstration
    renderPieChart("chart1", data.typewisePie);
    renderPieChart("chart2", data.relatedPie);
    renderPieChart("chart3", data.prioritywisePie);
    renderPieChart("chart4", data.clientwisePie);
  };

  $scope.getAnalytics = function (startDate, endDate) {
    AnalyticsService.getAnalytics(startDate, endDate).then(function (response) {
      $scope.analyticsData = response.data;
      console.log($scope.analyticsData);
      $scope.generatePieCharts($scope.analyticsData);
    });
  };
});
