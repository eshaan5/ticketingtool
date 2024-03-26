var cron = require("node-cron");
var createTicketFromEmail = require("./emailCreation");
var assignTicketsToAgents = require("./assignTicket");

cron.schedule("*/15 * * * *", function () {
    console.log("Fetching emails");
  createTicketFromEmail();
});

cron.schedule("*/5 * * * *", function () {
  console.log("Assigning tickets");
  assignTicketsToAgents();
});
