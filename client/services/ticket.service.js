app.service("TicketService", function ($http) {

  this.getTickets = function (page, pageSize, sortColumn, reverseSort, searchText, selectedPriority, selectedStatus) {
    return $http({
      params: { page, pageSize, sortColumn, reverseSort, searchText, selectedPriority, selectedStatus },
      method: "GET",
      url: "ticket/getTickets",
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    });
  };

  this.getLogs = function (ticketId, page, pageSize) {
    var url = `log/getLogs/${ticketId}?page=${page}&pageSize=${pageSize}`;
    return $http({
      method: "GET",
      url: url,
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    });
  };
});
