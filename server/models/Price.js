const { Schema, model } = require("mongoose");

const totalPriceSchema = new Schema({
  hourly: {
    type: Number,
  },
  mileage: {
    type: Number,
  },
});

const priceSchema = new Schema(
  {
    vehicleType: {
      type: String,
      enum: ["LUX full size sedan", "LUX SUV", "Premium sedan"],
      required: true,
    },
    hours: {
      type: Number,
      enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    },
    distance: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    price: { type: totalPriceSchema },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const Price = model("Price", priceSchema);

module.exports = Price;
