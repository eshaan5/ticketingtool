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
    })
  }
});
