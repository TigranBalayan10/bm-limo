const { Schema, model } = require("mongoose");

const contactSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        },
        messageText: {
            type: String,
            required: true,
            max: 500,
        },
    },
    {
        toJSON: {
            getters: true,
        },
    }
);

module.exports = model("Contact", contactSchema);