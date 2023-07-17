const { Schema, model } = require("mongoose");

const totalPriceSchema = new Schema({
  hourly: {
    type: Number,
    default: 0,
  },
  mileage: {
    type: Number,
  },
});

const flatRateSchema = new Schema({
  flatPrice: {
    type: Number,
    enum: [75, 100, 150, 180],
    default: null,
  },
  flatDropOff: {
    type: String,
    enum: [
      "Pasadena",
      "Glendale",
      "Burbank",
      "Encino",
      "Tarzana",
      "Sherman Oaks",
      "Universal City",
      "Studio City",
      "Beverly Hills",
      "West Hollywood",
      "Hollywood",
      "Downtown",
      "Westwood",
      "Brentwood",
      "Santa Monica",
      "Venice",
    ],
    default: null,
  },
});

const priceInfoSchema = new Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    vehicleType: {
      type: String,
      enum: ["LUX full size sedan", "LUX SUV", "Premium sedan"],
      required: true,
    },
    hours: {
      type: Number,
      enum: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      default: 0,
      required: true,
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
    flatRate: flatRateSchema,
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const Price = model("Price", priceInfoSchema);

module.exports = Price;
