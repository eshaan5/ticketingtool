app.service("TicketService", function ($http) {
  this.createTicket = function (formData) {
    $http.post("http://localhost:3000/ticket/create", formData, {
      transformRequest: angular.identity,
      headers: { "Content-Type": undefined, Authorization: "Bearer " + localStorage.getItem("token") },
    });
  };
});