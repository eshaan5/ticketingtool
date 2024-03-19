var Log = require("./log.modal");

function getLogs(req, res) {
  var ticketId = req.params.ticketId;

  Log.find({ ticketId: ticketId })
    .then(function (logs) {
      res.status(200).json(logs);
    })
    .catch(function (err) {
      res.status(500).json(err);
    });
}

module.exports = {
  getLogs: getLogs,
};