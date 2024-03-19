var Ticket = require("./ticket.modal");
var s3Upload = require("../../s3Service").s3Upload;
var Log = require("../log/log.modal");
var PendingRequest = require("../../utils/pendingRequests.modal");

function createTicket(req, res) {
  var ticket = req.body;
  ticket.status = "Open";
  ticket.assignedTo = {};
  ticket.assignedTo.agentId = req.user._id;
  ticket.assignedTo.agentName = req.user.name;

  s3Upload(req.files)
    .then(function (data) {
      ticket.attachments = data.map(function (file) {
        return {
          url: file.Location,
          name: file.key,
        };
      });
      return Ticket.create(ticket);
    })
    .then(function (ticket) {
      var log = new Log({
        ticketId: ticket._id,
        userId: req.user._id,
        action: "create",
        updatedTicketState: ticket.toObject(),
        // Other log fields
      });

      log.save();

      res.status(201).json(ticket);
    })
    .catch(function (err) {
      res.status(500).json(err);
    });
}

function getTickets(req, res) {
  Ticket.aggregate([
    // Match tickets assigned to the current user
    { $match: { "assignedTo.agentId": req.user._id } },

    // Add priority level based on conditions
    {
      $addFields: {
        priorityLevel: {
          $cond: [{ $eq: ["$priority", "high"] }, 1, { $cond: [{ $eq: ["$priority", "medium"] }, 2, 3] }],
        },
      },
    },

    // Sort tickets by priority level
    { $sort: { priorityLevel: 1 } },
  ])
    .then(function (tickets) {
      res.status(200).json(tickets);
    })
    .catch(function (err) {
      res.status(500).json(err);
    });
}

function updateTicket(req, res) {
  var ticket = req.body;
  var action = "update";
  var prevTicket;

  ticket.assignedTo = JSON.parse(ticket.assignedTo);

  Ticket.findById(ticket._id)
    .then(function (previousTicket) {
      prevTicket = previousTicket.toObject();
      if (ticket.assignedTo.agentId != previousTicket.assignedTo.agentId) {
        action = "raised a request to assign ticket to " + ticket.assignedTo.agentName;
        var pendingRequest = new PendingRequest({
          sender: {
            name: req.user.name,
            id: req.user._id,
          },
          receiver: {
            name: ticket.assignedTo.agentName,
            id: ticket.assignedTo.agentId,
          },
          ticketId: ticket._id,
        });

        pendingRequest.save();

        ticket.assignedTo = {};
      }

      return s3Upload(req.files);
    })
    .then(function (data) {
      if (ticket.attachments) ticket.attachments = JSON.parse(ticket.attachments);

      ticket.attachments
        ? (ticket.attachments = ticket.attachments.concat(
            data.map(function (file) {
              return {
                url: file.Location,
                name: file.key,
              };
            })
          ))
        : (ticket.attachments = data.map(function (file) {
            return {
              url: file.Location,
              name: file.key,
            };
          }));

      return Ticket.findByIdAndUpdate(ticket._id, ticket, { new: true });
    })
    .then(function (updateTicket) {
      console.log(updateTicket);
      var log = new Log({
        ticketId: ticket._id,
        userId: req.user._id,
        action: action,
        updatedTicketState: updateTicket.toObject(),
        previousTicketState: prevTicket,
        // Other log fields
      });

      log.save();

      res.status(200).json(ticket);
    })
    .catch(function (err) {
      console.log(err);
      res.status(500).json(err);
    });
}

module.exports = {
  createTicket: createTicket,
  getTickets: getTickets,
  updateTicket: updateTicket,
};
