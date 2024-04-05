var agentAnalytics = require("./utils/agent.analytics.js");
var adminAnalytics = require("./utils/admin.analytics.js");
var superAdminAnalytics = require("./utils/superAdmin.analytics.js");

function formatDate(dateString) {
  var date = new Date(dateString);

  // Format the date as YYYY-MM-DD
  return date;
}

function generateAnalytics(req, res) {
  var startDate = formatDate(req.query.startDate);
  var endDate = formatDate(req.query.endDate);

  var page1 = parseInt(req.query.page1);
  var page2 = parseInt(req.query.page2); // second graph of superadmin

  if (req.user.role == "agent") {
    Promise.all([agentAnalytics.getAssignedTickets(req.user._id), agentAnalytics.getPendingTickets(req.user._id), agentAnalytics.getClosedTickets(req.user._id), agentAnalytics.getTypeWiseTicket(startDate, endDate, req.user._id), agentAnalytics.getRelatedTickets(startDate, endDate, req.user._id), agentAnalytics.getPriorityWiseTicket(startDate, endDate, req.user._id), agentAnalytics.getClientWiseTicket(startDate, endDate, req.user._id), agentAnalytics.getTotalAssignedTickets(startDate, endDate, req.user._id), agentAnalytics.getTotalResolvedTickets(startDate, endDate, req.user._id), agentAnalytics.getUsersResolutionTime(startDate, endDate, req.user, page1)]).then((result) => {
      res.json({
        assignedTickets: result[0],
        pendingTickets: result[1],
        closedTickets: result[2],
        typewisePie: result[3],
        relatedPie: result[4],
        prioritywisePie: result[5],
        clientwisePie: result[6],
        totalAssignedTickets: result[7],
        totalResolvedTickets: result[8],
        usersResolutionTime: result[9],
      });
    });
  } else if (req.user.role == "admin") {
    Promise.all([adminAnalytics.getTicketsBySource(startDate, endDate, req.user.brandId), adminAnalytics.getTicketsByPriority(startDate, endDate, req.user.brandId), adminAnalytics.getTicketsByClient(startDate, endDate, req.user.brandId), adminAnalytics.getTicketsByType(startDate, endDate, req.user.brandId), adminAnalytics.getTicketsByRelation(startDate, endDate, req.user.brandId), adminAnalytics.getTicketsByStatus(startDate, endDate, req.user.brandId), adminAnalytics.getTotalTickets(startDate, endDate, req.user.brandId), adminAnalytics.avgResolutionTime(startDate, endDate, req.user.brandId), adminAnalytics.getWeeksDayWiseTicketCount(startDate, endDate, req.user.brandId), agentAnalytics.getUsersResolutionTime(startDate, endDate, req.user, page1)]).then((result) => {
      res.json({
        ticketsBySource: result[0],
        ticketsByPriority: result[1],
        ticketsByClient: result[2],
        ticketsByType: result[3],
        ticketsByRelation: result[4],
        ticketsByStatus: result[5],
        totalTickets: result[6],
        avgResolutionTime: result[7],
        weeksDayWiseTicketCount: result[8],
        usersResolutionTime: result[9],
      });
    });
  } else {
    Promise.all([superAdminAnalytics.getTotalBrands(), superAdminAnalytics.getTotalTickets(), superAdminAnalytics.newBrands(startDate, endDate), superAdminAnalytics.brandWiseResolutionTime(startDate, endDate, page1), superAdminAnalytics.brandsByTicketCount(startDate, endDate, page2)]).then((result) => {
      res.json({
        totalBrands: result[0],
        totalTickets: result[1],
        newBrands: result[2],
        brandWiseResolutionTime: result[3],
        brandsByTicketCount: result[4],
      });
    });
  }
}

module.exports = generateAnalytics;
