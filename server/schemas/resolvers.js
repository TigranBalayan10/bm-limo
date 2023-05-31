const { Order, Price } = require("../models");

const resolvers = {
  Query: {
    order: async () => {
      return await Order.find();
    },
    getOrder: async (parent, { _id }) => {
      return await Order.findById(_id);
    },
  },

  Mutation: {
    addOrder: async (parent, args) => {
      const order = await Order.create(args);
      return order;
    },
    createPrice: async (parent,  args ) => {
      const { vehicleType, hours, distance, duration } = args;
      console.log(vehicleType);
      const vehicleRatesHourly = {
        "LUX full size sedan": 80,
        "LUX SUV": 110,
        "Premium sedan": 60,
      };
      const vehicleRatesMileage = {
        "LUX full size sedan": 4,
        "LUX SUV": 5,
        "Premium sedan": 3,
      };
      const vehicleRatesDuration = {
        "LUX full size sedan": 1,
        "LUX SUV": 1.5,
        "Premium sedan": 0.8,
      };
      const baseRateVehicle = {
        "LUX full size sedan": 30,
        "LUX SUV": 50,
        "Premium sedan": 20,
      };
      const baseRate = baseRateVehicle[vehicleType];
      const milageRate = vehicleRatesMileage[vehicleType];
      const durationRate = vehicleRatesDuration[vehicleType];

      const priceHourly =
        hours < 3
          ? (vehicleRatesHourly[vehicleType] + vehicleRatesHourly / 5) * hours
          : vehicleRatesHourly[vehicleType] * hours;
      const priceMileage =
        distance * milageRate + baseRate + duration * durationRate;

      const price = new Price({
        ...args,
        price: {
          hourly: priceHourly? priceHourly : 0,
          mileage: priceMileage,
        },
      });

      const savedPrice = await price.save();
      return savedPrice;
    },
  },
};

module.exports = resolvers;
