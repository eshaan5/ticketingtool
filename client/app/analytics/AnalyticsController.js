app.controller("AnalyticsController", function ($scope, AnalyticsService, $location) {

  if (!localStorage.getItem("token")) {
    $location.path("/");
  }

  $scope.role = JSON.parse(localStorage.getItem("user")).role;
  // AnalyticsService.getAnalytics().then(function(response) {
  //     $scope.analyticsData = response.data;
  //     console.log($scope.analyticsData);
  // });
  $scope.analyticsData = {};
  $scope.charts = [];

  $scope.totalAgents = 0;
  $scope.currentPage1 = 1;
  $scope.currentPage2 = 1;

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

  function renderBarGraph1(data, label) {
    var labels, graphData;
    if ($scope.isSuperAdmin()) {
      labels = data
        .filter(function (item) {
          return item.length;
        })
        .map(function (item) {
          console.log(item[0]._id.name);
          return item[0]._id.name;
        });

      graphData = data
        .filter(function (item) {
          return item.length;
        })
        .map(function (item) {
          return item[0].value;
        });
    } else {
      labels = data.map(function (item) {
        return item._id.name;
      });

      graphData = data.map(function (item) {
        return item.value;
      });
    }

    var ctx = document.getElementById("barChart1").getContext("2d");
    var chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: label,
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

  function renderBarGraph2(data, label) {
    var labels = data
      .filter(function (item) {
        return item.length;
      })
      .map(function (item) {
        return item[0]._id.name;
      });

    var graphData = data
      .filter(function (item) {
        return item.length;
      })
      .map(function (item) {
        return item[0].value;
      });

    var ctx = document.getElementById("barChart2").getContext("2d");
    var chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: label,
            data: graphData,
            backgroundColor: "#FF6384",
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

  function renderBarGraph3 (data) {

    var createLabel = function (data) {
      var maxWeeks = 0;
      data.forEach(function (item) {
        maxWeeks = Math.max(maxWeeks, item.length);
      });
  
      var labels = [];
      for (var i = 0; i < maxWeeks; i++) {
        labels.push("Week " + (i + 1));
      }
  
      return labels;
    };

    var datasets = [
      {
        label: "Sunday",
        data: data[0],
        borderColor: "rgba(255, 255, 0, 1)",
        borderWidth: 1,
        fill: false,
      },
      {
        label: "Monday",
        data: data[1],
        borderColor: "rgba(0, 128, 128, 1)",
        borderWidth: 1,
        fill: false,
      },
      {
        label: "Tuesday",
        data: data[2],
        borderColor: "rgba(128, 0, 128, 1)",
        borderWidth: 1,
        fill: false,
      },
      {
        label: "Wednesday",
        data: data[3],
        borderColor: "rgba(255, 165, 0, 1)",
        borderWidth: 1,
        fill: false,
      },
      {
        label: "Thursday",
        data: data[4],
        borderColor: "rgba(0, 0, 255, 1)",
        borderWidth: 1,
        fill: false,
      },
      {
        label: "Friday",
        data: data[5],
        borderColor: "rgba(0, 255, 0, 1)",
        borderWidth: 1,
        fill: false,
      },
      {
        label: "Saturday",
        data: data[6],
        borderColor: "rgba(255, 0, 0, 1)",
        borderWidth: 1,
        fill: false,
      },
    ];

    //final data structure for chart.js
    var data = {
      labels: createLabel(data),
      datasets: datasets,
    };
    var config = {
      type: "line",
      data: data,
    };
    var ctx = document.getElementById("barChart2").getContext("2d");
    var chart = new Chart(ctx, config);
    $scope.charts.push(chart);
  }

  $scope.getAnalytics = function (currentPage1, currentPage2, startDate, endDate) {
    $scope.charts.forEach(function (chart) {
      chart.destroy();
    });

    var start = startDate ? startDate : $scope.startDate;
    var end = endDate ? endDate : $scope.endDate;

    AnalyticsService.getAnalytics(start, end, currentPage1, currentPage2).then(function (response) {
      $scope.analyticsData = response.data;
      console.log($scope.analyticsData);

      if (!$scope.isSuperAdmin()) $scope.generatePieCharts($scope.analyticsData);
      if ($scope.isSuperAdmin()) {
        $scope.totalG1 = $scope.analyticsData.totalBrands;
        renderBarGraph1($scope.analyticsData.brandWiseResolutionTime, "Average Resolution Time (days)");
        renderBarGraph2($scope.analyticsData.brandsByTicketCount, "Tickets");
      } else if ($scope.isAgent()) {
        $scope.totalG1 = $scope.analyticsData.usersResolutionTime.number[0].total;
        renderBarGraph1($scope.analyticsData.usersResolutionTime.data, "Average Resolution Time (days)");
      } else {
        $scope.totalG1 = $scope.analyticsData.usersResolutionTime.number[0].total;
        renderBarGraph1($scope.analyticsData.usersResolutionTime.data, "Average Resolution Time (days)");
        renderBarGraph3($scope.analyticsData.weeksDayWiseTicketCount);
      }
    });
  };
});
