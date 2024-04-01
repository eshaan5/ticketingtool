var AWS = require("aws-sdk");
var generateTicketId = require("./util").generateTicketId;
var Ticket = require("../api/ticket/ticket.modal");
var Log = require("../api/log/log.modal");

AWS.config.update({ region: "eu-north-1" });

var sqs = new AWS.SQS({ apiVersion: "2012-11-05" });

function pollQueue() {
  var params = {
    QueueUrl: "https://sqs.eu-north-1.amazonaws.com/975049884623/support-app.fifo",
    MaxNumberOfMessages: 10,
    WaitTimeSeconds: 20,
  };

  sqs
    .receiveMessage(params)
    .promise()
    .then(function (data) {
      if (data.Messages) {
        data.Messages.forEach(function (message) {
          var ticket = JSON.parse(message.Body);
          generateTicketId(ticket.brandId)
            .then(function (ticketId) {
              ticket.ticketId = ticketId;

              return Ticket.create(ticket);
            })
            .then(function (newTicket) {
              return Ticket.findById(newTicket._id).select("assignedTo priority status attachments type relatedTo description _id ticketId");
            })
            .then(function (ticket) {
              var log = new Log({
                ticketDocId: ticket._id,
                ticketId: ticket.ticketId,
                user: ticket.assignedTo,
                action: "create",
                updatedTicketState: ticket.toObject(),
                // Other log fields
              });

              log.save();

              sqs
                .deleteMessage({
                  QueueUrl: params.QueueUrl,
                  ReceiptHandle: message.ReceiptHandle,
                })
                .promise();
            })
            .catch(function () {
              sqs
                .deleteMessage({
                  QueueUrl: params.QueueUrl,
                  ReceiptHandle: message.ReceiptHandle,
                })
                .promise();
            });
        });
      }
    })
    .catch(function (err) {
      console.log(err);
    });
}

setInterval(pollQueue, 3000);
