app.controller("TicketsTableController", function ($scope, TicketService) {
  $scope.currentPage = 1;
  $scope.pageSize = 10;
  $scope.sortColumn = "createdAt";
  $scope.reverseSort = false;
  $scope.searchText = "";
  $scope.selectedPriority = "";
  $scope.selectedStatus = "";

  $scope.getTickets = function () {
    TicketService.getTickets($scope.currentPage, $scope.pageSize, $scope.sortColumn, $scope.reverseSort, $scope.searchText, $scope.selectedPriority, $scope.selectedStatus)
      .then(function (response) {
        $scope.tickets = response.data.tickets;
        $scope.totalItems = response.data.totalItems;
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  $scope.changeFilter = function () {
    $scope.currentPage = 1; // Reset page number when changing filter
    $scope.getTickets();
  };

  $scope.sortBy = function (column) {
    if ($scope.sortColumn === column) {
      $scope.reverseSort = !$scope.reverseSort;
    } else {
      $scope.sortColumn = column;
      $scope.reverseSort = false;
    }
    $scope.getTickets();
  };

  $scope.search = function () {
    $scope.currentPage = 1; // Reset page number when searching
    $scope.getTickets();
  };

  $scope.reset = function () {
    $scope.currentPage = 1;
    $scope.pageSize = 10;
    $scope.sortColumn = "createdAt";
    $scope.reverseSort = false;
    $scope.searchText = "";
    $scope.selectedPriority = "";
    $scope.selectedStatus = "";
    $scope.getTickets();
  };

  $scope.getTickets(); // Initial load of tickets
});
