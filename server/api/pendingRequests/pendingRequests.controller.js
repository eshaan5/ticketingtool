var PendingRequest = require("./pendingRequests.modal");

function getPendingRequests(req, res) {
    var userId = req.user._id;
    
    PendingRequest.find({ "receiver.id": userId })
        .then(function (requests) {
            res.status(200).json(requests);
        })
        .catch(function (err) {
            res.status(500).json(err);
        });
}

module.exports = {
    getPendingRequests: getPendingRequests
};