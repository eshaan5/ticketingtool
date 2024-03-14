var TicketType = require("./ticketType.modal");

function addTicketType(req, res) {
  var ticketType = new TicketType(req.body);
  ticketType.brandId = req.user.brandId;
  TicketType.create(ticketType)
    .then(function (ticketType) {
      res.status(201).json(ticketType);
    })
    .catch(function (err) {
      res.status(400).json(err);
    });
}

function getTicketTypes(req, res) {
  var searchCriteria = { $or: [{ brandId: req.user.brandId }, { brandId: { $exists: false } }] };
  TicketType.find(searchCriteria)
    .then(function (ticketTypes) {
      res.status(200).json(ticketTypes);
    })
    .catch(function (err) {
      res.status(500).json(err);
    });
}

module.exports = {
  addTicketType: addTicketType,
  getTicketTypes: getTicketTypes,
};
