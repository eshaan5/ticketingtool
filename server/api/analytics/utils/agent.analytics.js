var Ticket = require("../../ticket/ticket.modal");
var Log = require("../../log/log.modal");

function getAssignedTickets(agentId) {
  return Ticket.aggregate([
    {
      $match: {
        "assignedTo.agentId": agentId,
        status: { $ne: "Closed" },
      },
    },
    {
      $count: "ticketCount",
    },
  ]).then((result) => {
    return result[0].ticketCount;
  });
}

function getPendingTickets(agentId) {
  return Ticket.aggregate([
    {
      $match: {
        "assignedTo.agentId": agentId,
        status: "In Progress",
      },
    },
    {
      $count: "ticketCount",
    },
  ]).then((result) => {
    return result[0]?.ticketCount;
  });
}

function getClosedTickets(agentId) {
  return Log.aggregate([
    {
      $match: {
        "updatedTicketState.status": "Closed",
        "user._id": agentId,
        timestamp: {
          $gte: new Date(new Date().setHours(0o0, 0o0, 0o0)),
          $lt: new Date(new Date().setHours(23, 59, 59)),
        },
      },
    },
    {
      $count: "ticketCount",
    },
  ]).then((result) => {
    return result[0]?.ticketCount;
  });
}

function getTypeWiseTicket(startDate, endDate, agentId) {
  return Ticket.aggregate([
    {
      $match: {
        "assignedTo.agentId": agentId,
        createdAt: {
          $gte: new Date(new Date(startDate).setHours(0o0, 0o0, 0o0)),
          $lt: new Date(new Date(endDate).setHours(23, 59, 59)),
        },
      },
    },
    {
      $group: {
        _id: "$type",
        count: { $sum: 1 },
      },
    },
  ]).then((result) => {
    return result;
  });
}

function getRelatedTickets(startDate, endDate, agentId) {
  return Ticket.aggregate([
    {
      $match: {
        "assignedTo.agentId": agentId,
        createdAt: {
          $gte: new Date(new Date(startDate).setHours(0o0, 0o0, 0o0)),
          $lt: new Date(new Date(endDate).setHours(23, 59, 59)),
        },
      },
    },
    {
      $group: {
        _id: "$relatedTo",
        count: { $sum: 1 },
      },
    },
  ]).then((result) => {
    return result;
  });
}

function getPriorityWiseTicket(startDate, endDate, agentId) {
  return Ticket.aggregate([
    {
      $match: {
        "assignedTo.agentId": agentId,
        createdAt: {
          $gte: new Date(new Date(startDate).setHours(0o0, 0o0, 0o0)),
          $lt: new Date(new Date(endDate).setHours(23, 59, 59)),
        },
      },
    },
    {
      $group: {
        _id: "$priority",
        count: { $sum: 1 },
      },
    },
  ]).then((result) => {
    return result;
  });
}

function getClientWiseTicket(startDate, endDate, agentId) {
  return Ticket.aggregate([
    {
      $match: {
        "assignedTo.agentId": agentId,
        createdAt: {
          $gte: new Date(new Date(startDate).setHours(0o0, 0o0, 0o0)),
          $lt: new Date(new Date(endDate).setHours(23, 59, 59)),
        },
      },
    },
    {
      $group: {
        _id: "$clientDetails.email",
        count: { $sum: 1 },
      },
    },
  ]).then((result) => {
    return result;
  });
}

function getTotalAssignedTickets(startDate, endDate, agentId) {
  return Log.aggregate([
    {
      $match: {
        "updatedTicketState.assignedTo.agentId": agentId,
        timestamp: {
          $gte: new Date(new Date(startDate).setHours(0o0, 0o0, 0o0)),
          $lt: new Date(new Date(endDate).setHours(23, 59, 59)),
        },
      },
    },
    {
      $group: {
        _id: "$ticketDocId",
        total: { $sum: 1 },
      },
    },
  ]).then((result) => {
    return result.length;
  });
}

function getTotalResolvedTickets(startDate, endDate, agentId) {
  return Log.aggregate([
    {
      $match: {
        "updatedTicketState.status": "Closed",
        "user._id": agentId,
        timestamp: {
          $gte: new Date(new Date(startDate).setHours(0o0, 0o0, 0o0)),
          $lt: new Date(new Date(endDate).setHours(23, 59, 59)),
        },
      },
    },
    {
      $group: {
        _id: "$ticketDocId",
        total: { $sum: 1 },
      },
    },
  ]).then((result) => {
    return result.length;
  });
}

function getUsersResolutionTime (startDate, endDate, user, page, pageSize=10) {
  return Ticket.aggregate([
    {
      $match: {
        brandId: user.brandId,
        "resolution.date": {
          $gte: new Date(new Date(startDate).setHours(0o0, 0o0, 0o0)),
          $lt: new Date(new Date(endDate).setHours(23, 59, 59)),
        },
      }
    },
    {
      $group: {
        _id: "$resolution.by",
        avgTime: { $avg: "$resolution.time" }
      }
    },
    {
      $sort: { avgTime: 1 }
    },
    {
      $skip: (page - 1) * pageSize
    },
    {
      $limit: pageSize
    }
  ]).then((result) => {
    return result;
  });
}

module.exports = {
  getAssignedTickets,
  getPendingTickets,
  getClosedTickets,
  getTypeWiseTicket,
  getRelatedTickets,
  getPriorityWiseTicket,
  getClientWiseTicket,
  getTotalAssignedTickets,
  getTotalResolvedTickets,
  getUsersResolutionTime
};
