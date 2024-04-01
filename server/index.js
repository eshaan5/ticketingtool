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
