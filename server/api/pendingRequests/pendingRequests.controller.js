var PendingRequest = require("./pendingRequests.modal");
var Ticket = require("../ticket/ticket.modal");
var Log = require("../log/log.modal");

function getPendingRequests(req, res) {
  var userId = req.user._id;

  PendingRequest.find({ "receiver.id": userId })
    .then(function (requests) {
      res.status(200).json(requests);
    })
    .catch(function (err) {
      res.status(500).json(err);
    });
}

function manipulateRequest(req, res) {
  var requestId = req.params.requestId;
  var action = req.params.action;

  PendingRequest.findById(requestId)
    .then(function (request) {
      Ticket.findById(request.ticket._id).then(function (ticket) {
        if (action === "accept") {
          ticket.assignedTo.agentId = request.receiver.id;
          ticket.assignedTo.agentName = request.receiver.name;
        } else {
          ticket.assignedTo.agentId = request.sender.id;
          ticket.assignedTo.agentName = request.sender.name;
        }
        ticket
          .save()
          .then(function (updatedTicket) {
            return Ticket.findById(updatedTicket._id)
            .select("assignedTo priority status attachments type relatedTo description _id ticketId");
          })
          .then(function (updatedTicket) {
            var log = new Log({
              ticketDocId: updatedTicket._id,
              ticketId: updatedTicket.ticketId,
              userId: req.user._id,
              action: action + "ed the request",
              updatedTicketState: updatedTicket.toObject(),
              previousTicketState: request.ticket,
              // Other log fields
            });
            log.save().then(function () {
              return PendingRequest.findByIdAndDelete(requestId);
            });
          })
          .then(function () {
            res.status(200).json({ message: "Request " + action + "ed successfully" });
          });
      });
    })
    .catch(function (err) {
      res.status(500).json(err);
    });
}

module.exports = {
  getPendingRequests: getPendingRequests,
  manipulateRequest: manipulateRequest,
};
