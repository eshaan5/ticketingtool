var Ticket = require("../api/ticket/ticket.modal");
var User = require("../api/user/user.modal");

function assignTicketsToAgents() {
  Ticket.aggregate([
    { $match: { "assignedTo.agentId": { $exists: false } } },
    {
      $group: {
        _id: "$brandId", // Group by brand id
        tickets: { $push: "$$ROOT" }, // Store unassigned tickets in an array
      },
    },
  ])
    .then(function (tickets) {

        if (tickets.length === 0) {
            console.log("No tickets to assign");
            return;
          }

      for (var ticket of tickets) {
        User.find({ brandId: ticket._id, role: "agent", isOnline: true })
          .then(function (agents) {
            if (agents.length === 0) {
              console.log("No agents available");
              return;
            }

            var i = 0;
            for (t of ticket.tickets) {
              t.assignedTo = {
                agentId: agents[i]._id,
                agentName: agents[i].name,
              };
              i = (i + 1) % agents.length;
              Ticket.findByIdAndUpdate(t._id, t)
                .then(function () {
                  console.log("Ticket assigned to agent");
                })
                .catch(function (err) {
                  console.log(err);
                });
            }
          })
          .catch(function (err) {
            console.log(err);
          });
      }
    })
    .catch(function (err) {
      console.log(err);
    });
}

module.exports = assignTicketsToAgents;
