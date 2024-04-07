app.service("TicketService", function ($http) {
  this.createTicket = function (formData) {
    return $http.post("ticket/create", formData, {
      transformRequest: angular.identity,
      headers: { "Content-Type": undefined, Authorization: "Bearer " + localStorage.getItem("token") },
    });
  };

  this.getTickets = function (page, pageSize, sortColumn, reverseSort, searchText) {
    return $http({
      params: { page, pageSize, sortColumn, reverseSort, searchText },
      method: "GET",
      url: "ticket/getTickets",
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    });
  };

  this.updateTicket = function (formData) {
    return $http.put("ticket/update", formData, {
      transformRequest: angular.identity,
      headers: { "Content-Type": undefined, Authorization: "Bearer " + localStorage.getItem("token") },
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
