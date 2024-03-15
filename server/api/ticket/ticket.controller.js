var Ticket = require("./ticket.modal");
var s3Upload = require("../../s3Service").s3Upload;

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

module.exports = {
  createTicket: createTicket,
  getTickets: getTickets,
};
