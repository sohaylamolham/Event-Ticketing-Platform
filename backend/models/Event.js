
const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
    {
        organizerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true
        },

        category: {
            type: String,
            required: true
        },

        date: {
            type: Date,
            required: true
        },

        venue: {
            type: String,
            required: true
        },

        image: {
            type: String,
            default: ""
        },

        status: {
            type: String,
            enum: ["upcoming", "cancelled", "completed"],
            default: "upcoming"
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
