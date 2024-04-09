app.factory("TicketFactory", [
  "$http",
  "TicketService",
  function ($http, TicketService) {
    var factory = {};

    factory.create = function (newTicket, callback) {
      var formData = new FormData();

      for (var key in newTicket) {
        if (newTicket.hasOwnProperty(key)) {
          if (key == "clientDetails") {
            formData.append("clientDetails", JSON.stringify(newTicket.clientDetails));
          } else {
            formData.append(key, newTicket[key]);
          }
        }
      }

      // Append files
      var files = document.getElementById("attachments").files;
      for (var i = 0; i < 4; i++) {
        formData.append("attachments", files[i]);
      }

      TicketService.createTicket(formData).then(function (response) {
        callback(response.data);
      });
    };

    factory.update = function (ticket, callback) {
      $http.put("/tickets/" + ticket._id, ticket).then(function (returned_data) {
        callback(returned_data.data);
      });
    };

    return factory;
  },
]);
