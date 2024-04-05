app.controller("AnalyticsController", function ($scope, AnalyticsService, $location) {
  $scope.role = JSON.parse(localStorage.getItem("user")).role;
  // AnalyticsService.getAnalytics().then(function(response) {
  //     $scope.analyticsData = response.data;
  //     console.log($scope.analyticsData);
  // });
  $scope.analyticsData = {};
  $scope.charts = [];

  $scope.totalAgents = 0;
  $scope.currentPage = 1;
  $scope.pageSize = 10;

  $scope.endDate = new Date();
  $scope.startDate = new Date();

  $scope.isAdmin = function () {
    return $scope.role === "admin";
  };

  $scope.isAgent = function () {
    return $scope.role === "agent";
  };

  $scope.isSuperAdmin = function () {
    return $scope.role === "superAdmin";
  };

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
    if ($scope.role == "agent") {
      renderPieChart("chart1", data.typewisePie);
      renderPieChart("chart2", data.relatedPie);
      renderPieChart("chart3", data.prioritywisePie);
      renderPieChart("chart4", data.clientwisePie);
    } else if ($scope.role == "admin") {
      renderPieChart("chart1", data.ticketsBySource);
      renderPieChart("chart2", data.ticketsByPriority);
      renderPieChart("chart3", data.ticketsByClient);
      renderPieChart("chart4", data.ticketsByType);
      renderPieChart("chart5", data.ticketsByRelation);
      renderPieChart("chart6", data.ticketsByStatus);
    }
  };

  function renderBarGraph(data) {
    var labels = data.map(function (item) {
      return item._id.name;
    });

    var graphData = data.map(function (item) {
      return item.avgTime;
    });

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
        // responsive: true,
        // maintainAspectRatio: false,
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

  $scope.getAnalytics = function (currentPage, startDate, endDate) {
    $scope.charts.forEach(function (chart) {
      chart.destroy();
    });

    var start = startDate ? startDate : $scope.startDate;
    var end = endDate ? endDate : $scope.endDate;

    AnalyticsService.getAnalytics(start, end, currentPage, $scope.pageSize).then(function (response) {
      $scope.analyticsData = response.data;
      console.log($scope.analyticsData);

      if (!$scope.isSuperAdmin()) $scope.generatePieCharts($scope.analyticsData);
      renderBarGraph($scope.analyticsData.usersResolutionTime);
    });
  };
});
