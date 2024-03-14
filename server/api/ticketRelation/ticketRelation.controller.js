var TicketRelation = require("./ticketRelation.modal");

function addTicketRelation(req, res) {
  var ticketRelation = new TicketRelation(req.body);
  ticketRelation.brandId = req.user.brandId;
  TicketRelation.create(ticketRelation)
    .then(function (ticketRelation) {
      res.status(201).json(ticketRelation);
    })
    .catch(function (err) {
      res.status(400).json(err);
    });
}

function getTicketRelations(req, res) {
  var searchCriteria = { $or: [{ brandId: req.user.brandId }, { brandId: { $exists: false } }] };
  TicketRelation.find(searchCriteria)
    .then(function (ticketRelations) {
      res.status(200).json(ticketRelations);
    })
    .catch(function (err) {
      res.status(500).json(err);
    });
}

module.exports = {
  addTicketRelation: addTicketRelation,
  getTicketRelations: getTicketRelations,
};
