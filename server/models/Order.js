const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const orderSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    dateInfo: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    vehicleType: {
      type: String,
      enum: ["LUX full size sedan", "LUX SUV", "Premium sedan"],
      required: true,
    },
    hours: {
      type: Number,
      enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    },
    pickUpAddress: {
      type: String,
      required: true,
    },
    dropOffAddress: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    phoneNumber: {
      type: String,
      required: true,
      match: /^\d{3}-\d{3}-\d{4}$/,
    },
    price: {
      type: Schema.Types.ObjectId,
      ref: "Price",
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

module.exports = model("Order", orderSchema);
