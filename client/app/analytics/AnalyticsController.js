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

  function renderBarGraph(data) {
    console.log(data);

    var labels = data.topUsers.map(function (user) {
      return user._id.name;
    });
    var graphData = data.topUsers.map(function (user) {
      return user.avgTime;
    });

    if (data.currentUser && !data.topUsers.includes(data.currentUser)) {
      $scope.showUserPosition = true;
      $scope.userPosition = data.currentUser.rank;
    }

    var ctx = document.getElementById("barChart").getContext("2d");
    var chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Average Resolution Time (days)",
            data: graphData,
            backgroundColor: "#36A2EB",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
    $scope.charts.push(chart);
  }

  $scope.getAnalytics = function (startDate, endDate) {
    AnalyticsService.getAnalytics(startDate, endDate).then(function (response) {
      $scope.analyticsData = response.data;
      console.log($scope.analyticsData);
      $scope.generatePieCharts($scope.analyticsData);
      renderBarGraph($scope.analyticsData.usersResolutionTime);
    });
  };
});
