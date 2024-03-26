var cron = require("node-cron");
var createTicketFromEmail = require("./emailCreation");

cron.schedule("*/15 * * * *", function () {
    console.log("Running cron job");
  createTicketFromEmail();
});
