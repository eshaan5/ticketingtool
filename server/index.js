var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var mongoose = require("mongoose");
var dotenv = require("dotenv");
// require("./utils/cron");
require("./utils/SQSConsumer");

var seedSuperAdmin = require("./seed");

var app = express(); // this we do everytime
dotenv.config(); // this we do everytime

app.use(bodyParser.json({ limit: "30mb", extended: true })); // images
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true })); // to accept the data
app.use(cors()); // to allow cross-origin resource sharing

require("./routes")(app); // to use the routes

var CONNECTION_URL = "mongodb+srv://eshaan:Passw0rd@cluster0.eu7tom7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; // GOT THIS URL FROM MONGODB ATLAS - CLUSTER - CONNECT - CONNECT YOUR APPLICATION
var PORT = process.env.PORT || 3000; // process.env.PORT is for heroku

mongoose
  .connect(CONNECTION_URL) // connecting to the database, second parameter is to avoid warnings
  .then(function () {
    seedSuperAdmin(); // seeding the super admin
    app.listen(PORT, function () {
      console.log(`Server running on port: ${PORT}`);
    });
  }) // if connection is successful, then start the server
  .catch(function (error) {
    console.log(error.message);
  }); // if connection is not successful, then log the error

  /* function getRandomDate() {
  const startDate = new Date("2024-01-08").getTime();
  const endDate = new Date("2024-04-08").getTime();
  const randomTime = startDate + Math.random() * (endDate - startDate);
  return new Date(randomTime);
}

function generateRandomData() {
  // add 100 ticket to every user - 50 closed and rest either in progress or open
  User.find({ role: "agent" })
    .then(function (users) {
      users.forEach(function (user, index) {
        for (let i = 0; i < 100; i++) {
          console.log("Creating ticket for user", user.name);
          const ticket = new Ticket({
            title: `Ticket ${i + 1}${index + 1}`,
            source: ["Email", "Manual"][Math.floor(Math.random() * 2)],
            description: `Description for ticket ${i + 1}`,
            type: ["Feature Request", "Bug", "Question"][Math.floor(Math.random() * 3)],
            priority: ["Low", "Medium", "High"][Math.floor(Math.random() * 3)],
            status: i % 2 === 0 ? "Closed" : i % 3 === 0 ? "In Progress" : "Open",
            relatedTo: ["Hardware", "Software", "Network"][Math.floor(Math.random() * 3)],
            assignedTo: {
              agentId: user._id,
              agentName: user.name,
            },
            clientDetails: {
              name: `Client ${i + 1}`,
              email: `client${i + 1}@gmail.com`,
            },
            ticketId: `TC${i + 1}${index + 1}`,
            createdAt: getRandomDate(),
            updatedAt: getRandomDate(),
            brandId: user.brandId,
            resolution:
              i % 2 === 0
                ? {
                    date: getRandomDate(),
                    time: Math.random() * 7,
                    by: user,
                  }
                : {},
          });
          ticket.save()
          .then(function (ticket) {
            Log.create({
              ticketId: ticket.ticketId,
              user: user,
              ticketDocId: ticket._id,
              action: "create",
              updatedTicketState: ticket,
            });
        })
      }
      });
    })
    .catch(function (error) {
      console.log(error.message);
    });
} */
