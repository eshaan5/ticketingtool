var Log = require("./log.modal");

function getLogs(req, res) {
  var ticketId = req.params.ticketId;

  var page = parseInt(req.query.page);
  var pageSize = parseInt(req.query.pageSize); // Default page size is 5
  // // Perform aggregation to get total count and paginated logs

  Log.countDocuments({ ticketId: ticketId})
  .then(function (count) {
    Log.find({ ticketId: ticketId })
      .sort({ createdAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .then(function (logs) {
        res.status(200).json({ logs: logs, total: count });
      })
      .catch(function (err) {
        res.status(500).json({ error: err });
      });
  })
}

module.exports = {
  getLogs: getLogs,
};
