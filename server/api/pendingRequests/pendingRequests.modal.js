var mongoose = require("mongoose");

var pendingRequestSchema = new mongoose.Schema({
    sender: {
        name: {
            type: String,
            required: true
        },
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    receiver: {
        name: {
            type: String,
            required: true
        },
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    ticket: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    }
});

var PendingRequest = mongoose.model("PendingRequest", pendingRequestSchema);

module.exports = PendingRequest;