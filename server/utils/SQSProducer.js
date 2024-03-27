var AWS = require("aws-sdk");

AWS.config.update({ region: "eu-north-1" });
var sqs = new AWS.SQS({ apiVersion: "2012-11-05" });

function enqueueTicket(ticket) {
  var params = {
    MessageBody: JSON.stringify(ticket),
    QueueUrl: "https://sqs.eu-north-1.amazonaws.com/975049884623/support-app.fifo",
    MessageGroupId: "support-app",
  };

  return sqs.sendMessage(params).promise();
}

module.exports = enqueueTicket;
