app.controller("PieChartsController", function ($scope, $http) {
//   function renderPieChart(canvasId, data) {
//     var ctx = document.getElementById(canvasId).getContext("2d");
//     var chart = new Chart(ctx, {
//       type: "pie",
//       data: {
//         labels: Object.keys(data),
//         datasets: [
//           {
//             data: Object.values(data),
//             backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#8BC34A"],
//           },
//         ],
//       },
//       options: {
//         responsive: true,
//         maintainAspectRatio: false,
//       },
//     });
//     $scope.charts.push(chart);
//   }

//   $scope.generatePieCharts = function () {
//     console.log($scope.analyticsData);
//     // Fetch data from the backend and render the pie charts
//     // Example data for demonstration
//     renderPieChart("chart1", $scope.analyticsData.typewisePie);
//     renderPieChart("chart2", $scope.analyticsData.relatedPie);
//     renderPieChart("chart3", $scope.analyticsData.prioritywisePie);
//     renderPieChart("chart4", $scope.analyticsData.clientwisePie);
//   };
});
