app.factory("TicketFactory", [
  "$http",
  "TicketService",
  function ($http, TicketService) {
    var factory = {};

    factory.create = function (newTicket, callback) {
      var formData = new FormData();
      // formData.append('title', $scope.newTicket.title);
      // formData.append('source', $scope.newTicket.source);
      // formData.append('type', $scope.newTicket.type);
      // formData.append('relatedTo', $scope.newTicket.relatedTo);
      // formData.append('priority', $scope.newTicket.priority);
      // formData.append('description', $scope.newTicket.description);
      // formData.append('clientDetails.name', $scope.newTicket.clientName);
      // formData.append('clientDetails.email', $scope.newTicket.clientEmail);
      // formData.append('clientDetails.phone', $scope.newTicket.clientNumber);

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
      for (var i = 0; i < files.length; i++) {
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
