const { Schema, model } = require("mongoose");

const totalPriceSchema = new Schema({
  hourly: {
    type: Number,
  },
  mileage: {
    type: Number,
  },
  currency: {
    type: String,
    default: "USD",
  },
});

const priceInfoSchema = new Schema(
  {
    vehicleType: {
      type: String,
      enum: ["LUX full size sedan", "LUX SUV", "Premium sedan"],
      required: true,
    },
    hours: {
      type: Number,
      enum: [0,1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    },
    distance: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    priceTotal: totalPriceSchema,
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const Price = model("Price", priceInfoSchema);

module.exports = Price;
