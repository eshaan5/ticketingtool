var Imap = require("imap");
var simpleParser = require("mailparser").simpleParser;
var Brand = require("./api/brand/brand.modal");
var s3Upload = require("./s3Service").s3Upload;
var Ticket = require("./api/ticket/ticket.modal");
var Log = require("./api/log/log.modal");

function createTicketFromEmail() {
  Brand.find({}).then(function (brands) {
    brands.forEach(function (brand) {
      var imap = new Imap({
        user: brand.brandEmail,
        password: brand.password,
        host: "imap.gmail.com",
        port: 993,
        tls: true,
        tlsOptions: { rejectUnauthorized: false },
      });

      imap.once("ready", function () {
        imap.openBox("INBOX", false, function (err, box) {
          if (err) throw err;
          imap.search(["UNSEEN", ["SINCE", new Date()]], function (err, results) {
            if (err) throw err;

            if (results.length === 0) {
              console.log("No unread emails to fetch. Terminating...");
              imap.end(); // Close the connection
              return; // Exit the function
            }

            var f = imap.fetch(results, { bodies: "" });
            f.on("message", function (msg) {
              msg.on("body", function (stream, info) {
                simpleParser(stream, function (err, mail) {
                  if (err) throw err;
                  // create ticket

                  console.log(mail);

                  var ticket = {
                    title: mail.subject,
                    source: "Email",
                    priority: "Low",
                    status: "Open",
                    description: mail.text,
                    clientDetails: {
                      name: mail.from.value[0].name,
                      email: mail.from.value[0].address,
                    },
                    brandId: brand._id,
                  };

                  s3Upload(mail.attachments)
                    .then(function (data) {
                      ticket.attachments = data.map(function (file) {
                        return {
                          url: file.Location,
                          name: file.key,
                        };
                      });
                      return Ticket.create(ticket);
                    })
                    .then(function (ticket) {
                      var log = new Log({
                        ticketId: ticket._id,
                        action: "create",
                        updatedTicketState: ticket.toObject(),
                      });

                      log.save();
                    })
                    .catch(function (err) {
                      console.log(err);
                    });
                });
              });
              msg.once("attributes", function (attrs) {
                var uid = attrs.uid;
                imap.addFlags(uid, ["\\Seen"], function (err) {
                  if (err) throw err;
                });
              });
            });
            f.once("end", function () {
              imap.end();
            });
          });
        });
      });

      imap.once("error", function (err) {
        console.log(err);
      });

      imap.once("end", function () {
        console.log("Connection ended");
      });

      imap.connect();
    });
  });
}

module.exports = createTicketFromEmail;
