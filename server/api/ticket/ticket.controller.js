var Ticket = require("./ticket.modal");
var s3Upload = require("../../utils/s3Service").s3Upload;
var Log = require("../log/log.modal");
var PendingRequest = require("../pendingRequests/pendingRequests.modal");
var enqueueTicket = require("../../utils/SQSProducer");

function createTicket(req, res) {
  var ticket = req.body;
  ticket.status = "Open";
  ticket.assignedTo = {};
  ticket.assignedTo.agentId = req.user._id;
  ticket.assignedTo.agentName = req.user.name;
  ticket.brandId = req.user.brandId;
  ticket.clientDetails = JSON.parse(ticket.clientDetails);

  s3Upload(req.files)
    .then(function (data) {
      ticket.attachments = data.map(function (file) {
        return {
          url: file.Location,
          name: file.key,
        };
      });
      return enqueueTicket(ticket);
    })
    .then(function (data) {
      res.status(200).json({ message: "Ticket created successfully" });
    })
    .catch(function (err) {
      res.status(500).json(err);
    });
}

function getTickets(req, res) {
  var page = parseInt(req.query.page) || 1;
  var pageSize = parseInt(req.query.pageSize) || 10;
  var sortBy = req.query.sortBy || "createdAt"; // Default sorting by createdAt
  var reverseSort = req.query.reverseSort === "true";
  var searchText = req.query.searchText || "";

  var sortCriteria = {};
  if (sortBy === "priority") {
    // Sort by priority based on mapping
    sortCriteria = { $sort: { $cond: { if: { $eq: ["$priority", "Low"] }, then: 1, else: { $cond: { if: { $eq: ["$priority", "Medium"] }, then: 2, else: 3 } } } } };
  } else if (sortBy === "status") {
    // Sort by status based on mapping
    sortCriteria = { $sort: { $cond: { if: { $eq: ["$status", "Open"] }, then: 1, else: { $cond: { if: { $eq: ["$status", "In Progress"] }, then: 2, else: 3 } } } } };
  } else if (sortBy === "createdAt") {
    // Sort by createdAt
    sortCriteria[sortBy] = reverseSort ? 1 : -1;
  } else {
    // Default sorting criteria
    sortCriteria[sortBy] = reverseSort ? -1 : 1;
  }

  Ticket.aggregate([
    {
      $facet: {
        // Perform pagination
        tickets: [
          {
            $match: {
              $or: [
                { title: { $regex: searchText, $options: "i" } }, // Case-insensitive search in title
                { description: { $regex: searchText, $options: "i" } }, // Case-insensitive search in description
              ],
            },
          },
          {
            $sort: sortCriteria,
          },
          {
            $skip: (page - 1) * pageSize,
          },
          {
            $limit: pageSize,
          },
        ],
        // Count total number of tickets
        totalCount: [
          {
            $count: "totalItems",
          },
        ],
      },
    },
  ])
    .then(function (result) {
      var response = {
        tickets: result[0].tickets,
        totalItems: result[0].totalCount[0].totalItems,
      };

      res.status(200).json(response);
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
  ticket.clientDetails = JSON.parse(ticket.clientDetails);
  var agent = ticket.assignedTo;

  Ticket.findById(ticket._id)
    .select("assignedTo priority status attachments type relatedTo description")
    .then(function (previousTicket) {
      prevTicket = previousTicket.toObject();
      if (ticket.assignedTo.agentId != previousTicket.assignedTo.agentId) {
        action = "raised a request to assign ticket to " + ticket.assignedTo.agentName;

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

      if (ticket.status == "Closed") {
        ticket.resolution = {};
        ticket.resolution.date = new Date();
        ticket.resolution.time = (new Date() - new Date(ticket.createdAt)) / (1000 * 60 * 60 * 24) + 1;
        ticket.resolution.by = req.user;
      }

      return Ticket.findByIdAndUpdate(ticket._id, ticket, { new: true, select: "assignedTo priority status attachments type relatedTo description _id ticketId" });
    })
    .then(function (updateTicket) {
      if (!updateTicket.assignedTo.agentId) {
        var pendingRequest = new PendingRequest({
          sender: {
            name: req.user.name,
            id: req.user._id,
          },
          receiver: {
            name: agent.agentName,
            id: agent.agentId,
          },
          ticket: updateTicket.toObject(),
        });

        pendingRequest.save();
      }

      var log = new Log({
        ticketDocId: updateTicket._id,
        ticketId: ticket.ticketId,
        user: req.user,
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
