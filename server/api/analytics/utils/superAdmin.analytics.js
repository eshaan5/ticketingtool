var Ticket = require("../../ticket/ticket.modal");
var Log = require("../../log/log.modal");
var Brand = require("../../brand/brand.modal");

function getTotalBrands() {
  // only enabled brands
  return Brand.find({ isDisabled: false })
    .then((result) => {
      return result.length;
    })
    .catch((err) => {
      return err;
    });
}

function getTotalTickets() {
  return Ticket.find({})
    .then((result) => {
      return result.length;
    })
    .catch((err) => {
      return err;
    });
}

function newBrands(startDate, endDate) {
  return Brand.find({
    createdAt: {
      $gte: new Date(new Date(startDate).setHours(0o0, 0o0, 0o0)),
      $lt: new Date(new Date(endDate).setHours(23, 59, 59)),
    },
  })
    .then((result) => {
      return result.length;
    })
    .catch((err) => {
      return err;
    });
}

function brandWiseResolutionTime(startDate, endDate, page, limit=10) {
  return Brand.find({isDisabled: false})
    .then((result) => {
      let promises = [];
      result.forEach((brand) => {
        promises.push(
          Ticket.aggregate([
            {
              $match: {
                createdAt: {
                  $gte: new Date(new Date(startDate).setHours(0o0, 0o0, 0o0)),
                  $lt: new Date(new Date(endDate).setHours(23, 59, 59)),
                },
                brandId: brand._id,
              },
            },
            {
              $group: {
                _id: {brandName: brand.name},
                avgResolutionTime: { $avg: "$resolution.time" },
              },
            },
            {
              $sort: { avgResolutionTime: -1 },
            },
            {
              $skip: (page - 1) * limit,
            },
            {
              $limit: limit,
            },
          ])
        );
      });
      return Promise.all(promises);
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

function brandsByTicketCount(startDate, endDate, page, limit=10) {
  return Brand.find({isDisabled: false})
    .then((result) => {
      let promises = [];
      result.forEach((brand) => {
        promises.push(
          Ticket.aggregate([
            {
              $match: {
                createdAt: {
                  $gte: new Date(new Date(startDate).setHours(0o0, 0o0, 0o0)),
                  $lt: new Date(new Date(endDate).setHours(23, 59, 59)),
                },
                brandId: brand._id,
              },
            },
            {
              $group: {
                _id: {brandName: brand.name},
                count: { $sum: 1 },
              },
            },
            {
              $sort: { count: -1 },
            },
            {
              $skip: (page - 1) * limit,
            },
            {
              $limit: limit,
            },
          ])
        );
      });
      return Promise.all(promises);
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

module.exports = {
  getTotalBrands,
  getTotalTickets,
  newBrands,
  brandWiseResolutionTime,
  brandsByTicketCount,
};
