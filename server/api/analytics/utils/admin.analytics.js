var Ticket = require("../../ticket/ticket.modal");
var Log = require("../../log/log.modal");

function getTicketsBySource(startDate, endDate, brandId) {
  return Ticket.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date(new Date(startDate).setHours(0o0, 0o0, 0o0)),
          $lt: new Date(new Date(endDate).setHours(23, 59, 59)),
        },
        brandId: brandId,
      },
    },
    {
      $group: {
        _id: "$source",
        count: { $sum: 1 },
      },
    },
  ])
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

function getTicketsByPriority(startDate, endDate, brandId) {
  return Ticket.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date(new Date(startDate).setHours(0o0, 0o0, 0o0)),
          $lt: new Date(new Date(endDate).setHours(23, 59, 59)),
        },
        brandId: brandId,
      },
    },
    {
      $group: {
        _id: "$priority",
        count: { $sum: 1 },
      },
    },
  ])
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

function getTicketsByClient(startDate, endDate, brandId) {
  return Ticket.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date(new Date(startDate).setHours(0o0, 0o0, 0o0)),
          $lt: new Date(new Date(endDate).setHours(23, 59, 59)),
        },
        brandId: brandId,
      },
    },
    {
      $group: {
        _id: "$clientDetails.email",
        count: { $sum: 1 },
      },
    },
  ])
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

function getTicketsByType(startDate, endDate, brandId) {
  return Ticket.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date(new Date(startDate).setHours(0o0, 0o0, 0o0)),
          $lt: new Date(new Date(endDate).setHours(23, 59, 59)),
        },
        brandId: brandId,
      },
    },
    {
      $group: {
        _id: "$type",
        count: { $sum: 1 },
      },
    },
  ])
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

function getTicketsByRelation(startDate, endDate, brandId) {
  return Ticket.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date(new Date(startDate).setHours(0o0, 0o0, 0o0)),
          $lt: new Date(new Date(endDate).setHours(23, 59, 59)),
        },
        brandId: brandId,
      },
    },
    {
      $group: {
        _id: "$relatedTo",
        count: { $sum: 1 },
      },
    },
  ])
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

function getTicketsByStatus(startDate, endDate, brandId) {
  return Ticket.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date(new Date(startDate).setHours(0o0, 0o0, 0o0)),
          $lt: new Date(new Date(endDate).setHours(23, 59, 59)),
        },
        brandId: brandId,
      },
    },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ])
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

function getTotalTickets(startDate, endDate, brandId) {
  return Ticket.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date(new Date(startDate).setHours(0o0, 0o0, 0o0)),
          $lt: new Date(new Date(endDate).setHours(23, 59, 59)),
        },
        brandId: brandId,
      },
    },
    {
      $count: "count",
    }
  ]).then((result) => {
    return result[0].count;
  });
}

function avgResolutionTime(startDate, endDate, brandId) {
  return Ticket.aggregate([
    {
      $match: {
        brandId: brandId,
        "resolution.date": { $exists: true },
        "resolution.date": {
          $gte: new Date(new Date(startDate).setHours(0o0, 0o0, 0o0)),
          $lt: new Date(new Date(endDate).setHours(23, 59, 59)),
        },
      },
    },
    {
      $group: {
        _id: null,
        avgTime: {
          $avg: {
            $divide: [
              {
                $subtract: ["$resolution.date", "$createdAt"],
              },
              1000 * 60 * 60 * 24,
            ],
          },
        },
      },
    },
  ]).then((result) => {
    return result[0].avgTime.toFixed(2);
  });
}

function getWeeksDayWiseTicketCount (startDate, endDate, brandId) {

  var createLabels = function (startDate, endDate) {
    var Data = {};
    var start = new Date(startDate);
    var end = new Date(endDate);
    var currentDate = new Date(startDate);
  
    while (currentDate <= end) {
      Data[currentDate.toISOString().slice(0, 10)] = 0;
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return Data;
  };
  
  var createWeeks = function (orders, startDate, endDate) {
    var weeks = [[], [], [], [], [], [], []];
    var Data = createLabels(startDate, endDate);
    orders.forEach(function (order) {
      Data[order._id] = order.count;
    });
    Data = Object.entries(Data);
    Data.forEach(function (data) {
      var day = new Date(data[0]).getDay();
      weeks[day].push(data[1]);
    });
    return weeks;
  };

    return Ticket.aggregate([
        {
            $match: {
                createdAt: {
                    $gte: new Date(new Date(startDate).setHours(0o0, 0o0, 0o0)),
                    $lt: new Date(new Date(endDate).setHours(23, 59, 59)),
                },
                brandId: brandId,
            },
        },
        {
            $group: {
                _id: {
                    $dateToString: {
                        format: "%Y-%m-%d",
                        date: "$createdAt",
                    },
                },
                count: { $sum: 1 },
            }
        }
    ]).then((result) => {
        return createWeeks(result, startDate, endDate);
    });
}

module.exports = {
  getTicketsBySource,
  getTicketsByPriority,
  getTicketsByClient,
  getTicketsByType,
  getTicketsByRelation,
  getTicketsByStatus,
  getTotalTickets,
  avgResolutionTime,
  getWeeksDayWiseTicketCount
};
