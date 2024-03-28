app.service("TicketService", function ($http) {
  this.createTicket = function (formData) {
    return $http.post("http://localhost:3000/ticket/create", formData, {
      transformRequest: angular.identity,
      headers: { "Content-Type": undefined, Authorization: "Bearer " + localStorage.getItem("token") },
    });
  };

  this.getTickets = function () {
    return $http({
      method: "GET",
      url: "http://localhost:3000/ticket/getTickets",
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    });
  };

  this.updateTicket = function (formData) {
    return $http.put("http://localhost:3000/ticket/update", formData, {
      transformRequest: angular.identity,
      headers: { "Content-Type": undefined, Authorization: "Bearer " + localStorage.getItem("token") },
    });
  };

  this.getLogs = function (ticketId, page, pageSize) {
    var url = `http://localhost:3000/log/getLogs/${ticketId}?page=${page}&pageSize=${pageSize}`;
    return $http({
      method: "GET",
      url: url,
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    });
  };
});
