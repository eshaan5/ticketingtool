var agentAnalytics = require("./utils/agent.analytics.js");

function formatDate(dateString) {
  var date = new Date(dateString);

  // Format the date as YYYY-MM-DD
  return date;
}

function generateAnalytics(req, res) {
  var startDate = formatDate(req.query.startDate);
  var endDate = formatDate(req.query.endDate);

  Promise.all([agentAnalytics.getAssignedTickets(req.user._id), agentAnalytics.getPendingTickets(req.user._id), agentAnalytics.getClosedTickets(req.user._id), agentAnalytics.getTypeWiseTicket(startDate, endDate, req.user._id), agentAnalytics.getRelatedTickets(startDate, endDate, req.user._id), agentAnalytics.getPriorityWiseTickets(startDate, endDate, req.user._id), agentAnalytics.getClientWiseTicket(startDate, endDate, req.user._id)]).then((result) => {
    res.json({
      assignedTickets: result[0],
      pendingTickets: result[1],
      closedTickets: result[2],
      typewisePie: result[3],
      relatedPie: result[4],
      prioritywisePie: result[5],
      clientwisePie: result[6],
    });
  });
}

module.exports = generateAnalytics;
