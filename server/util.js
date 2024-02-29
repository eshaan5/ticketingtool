var crypto = require("crypto");
var nodemailer = require("nodemailer");

function generatePassword() {
  var length = 8;
  var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+";
  var password = "";

  while (password.length < length) {
    var randomIndex = crypto.randomInt(0, charset.length);
    password += charset[randomIndex];
  }

  // Ensure password meets criteria
  if (!/[A-Z]/.test(password)) {
    var randomUppercaseIndex = crypto.randomInt(0, password.length);
    password = password.substr(0, randomUppercaseIndex) + "A" + password.substr(randomUppercaseIndex + 1);
  }

  if (!/[0-9]/.test(password)) {
    var randomDigitIndex = crypto.randomInt(0, password.length);
    password = password.substr(0, randomDigitIndex) + "1" + password.substr(randomDigitIndex + 1);
  }

  var specialChars = "!@#$%^&*()-_=+";
  if (!new RegExp("[" + specialChars.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "]").test(password)) {
    var randomSpecialCharIndex = crypto.randomInt(0, password.length);
    password = password.substr(0, randomSpecialCharIndex) + specialChars.charAt(crypto.randomInt(0, specialChars.length)) + password.substr(randomSpecialCharIndex + 1);
  }

  return password;
}

function sendConfirmationEmail(email, password) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "eshaanbagga@gmail.com",
      pass: "jvua qeqz pdls lfpl",
    },
  });

  const mailOptions = {
    from: "eshaanbagga@gmail.com",
    to: email,
    subject: "Brand Creation Confirmation",
    text: `Your brand has been created successfully. Use the following password to log in: ${password}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error("Error sending confirmation email:", error);
    } else {
      console.log("Confirmation email sent:", info.response);
    }
  });
}

module.exports = {
    generatePassword: generatePassword,
    sendConfirmationEmail: sendConfirmationEmail,
}
