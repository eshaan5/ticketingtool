app.factory("TicketFactory", [
  "$http",
  "TicketService",
  function ($http) {
    function Ticket(ticket) {
      this.title = ticket.title;
      this.description = ticket.description;
      this.clientDetails = ticket.clientDetails;
      this.priority = ticket.priority;
      this.source = ticket.source;
      this.type = ticket.type;
      this.relatedTo = ticket.relatedTo;
      this.attachments = ticket.attachments;
      this.assignedTo = ticket.assignedTo || {};
      this.newAttachments = ticket.newAttachments || [];
      this.ticketId = ticket.ticketId || "";
      this._id = ticket._id || "";
      this.status = ticket.status || "Open";
    }

    Ticket.prototype.checkError = function (ticketTypes, ticketRelations) {
      if (!this.title) return "No title provided";
      if (!this.description) return "No description provided";
      if (!this.clientDetails.name) return "Enter client name";
      if (!this.clientDetails.email) return "Enter client email";
      if (!this.clientDetails.email.match(/^[a-zA-Z\d][^\s@]+@[^\s@]+\.[a-zA-Z]+$/)) return "Invalid client email";

      if (
        !ticketTypes
          .map(function (type) {
            return type.name;
          })
          .includes(this.type)
      )
        return "Invalid ticket type";
      if (
        !ticketRelations
          .map(function (relation) {
            return relation.name;
          })
          .includes(this.relatedTo)
      )
        return "Invalid ticket relation";
      if (!["Low", "Medium", "High"].includes(this.priority)) return "Invalid priority";
      if (!["Email", "Manual"].includes(this.source)) return "Invalid source";

      return "";
    };

    Ticket.prototype.submitTicket = function (callback) {
      var formData = new FormData();

      for (var key in this) {
        if (this.hasOwnProperty(key)) {
          if (key == "clientDetails") {
            formData.append("clientDetails", JSON.stringify(this.clientDetails));
          } else if (key == "attachments") {
            var length = this.attachments.length > 4 ? 4 : this.attachments.length;
            for (var i = 0; i < length; i++) {
              formData.append("attachments", this.attachments[i]);
            }
          } else {
            formData.append(key, this[key]);
          }
        }
      }

      $http
        .post("ticket/create", formData, {
          transformRequest: angular.identity,
          headers: { "Content-Type": undefined, Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then(function (response) {
          callback(response.data);
        });
    };

    Ticket.prototype.updateTicket = function (callback) {
      var formData = new FormData();

      for (var key in this) {
        if (this.hasOwnProperty(key)) {
          if (key == "clientDetails") {
            formData.append("clientDetails", JSON.stringify(this.clientDetails));
          } else if (key == "attachments") {
            formData.append("attachments", JSON.stringify(this.attachments));
          } else if (key == "assignedTo") {
            formData.append("assignedTo", JSON.stringify(this.assignedTo));
          } else if (key == "newAttachments") {
            var length = this.newAttachments.length > 4 ? 4 : this.newAttachments.length;
            for (var i = 0; i < length; i++) {
              formData.append("attachments", this.newAttachments[i]);
            }
          } else {
            formData.append(key, this[key]);
          }
        }
      }

      $http
        .put("ticket/update", formData, {
          transformRequest: angular.identity,
          headers: { "Content-Type": undefined, Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then(function (response) {
          callback(response.data);
        });
    };

    return Ticket;
  },
]);
