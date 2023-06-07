const { Order, Price } = require("../models");
const { calculateRoute } = require("../utils/googleMapCalculation");

const resolvers = {
  Query: {
    order: async () => {
      return await Order.find();
    },
    getOrder: async (parent, { _id }) => {
      return await Order.findById(_id);
    },
    getPrice: async (parent, { _id }) => {
      return await Price.findById(_id);
    },
    getPrices: async () => {
      return await Price.find();
    },
  },

  Mutation: {
    addOrder: async (parent, args) => {
      const order = await Order.create(args);
      const { pickUpAddress, dropOffAddress, hours, vehicleType } = args;
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

      if (!dropOffAddress) {
        const priceHourly =
          hours < 3
            ? (vehicleRatesHourly[vehicleType] + vehicleRatesHourly / 5) * hours
            : vehicleRatesHourly[vehicleType] * hours;

        const price = new Price({
          vehicleType: vehicleType,
          hours: hours,
          distance: 0,
          duration: 0,
          priceTotal: {
            hourly: priceHourly,
            mileage: 0,
          },
        });

        const savedPrice = await price.save();
        const newOrder = {
          ...order._doc,
          price: savedPrice,
        };
        return newOrder;
      }

      const { distance, duration } = await calculateRoute(
        pickUpAddress,
        dropOffAddress
      );
      const distanceInt = Number(distance.split(" ")[0]);
      const durationArray = duration.split(" ");
      let timeHours = 0;
      let minutes = 0;
      if (durationArray.length === 4) {
        timeHours = Number(durationArray[0]);
        minutes = Number(durationArray[2]);
      } else if (durationArray.length === 2) {
        if (durationArray[1] === "mins") {
          minutes = Number(durationArray[0]);
        } else {
          timeHours = Number(durationArray[0]);
        }
      }
      const durationInt = timeHours * 60 + minutes;
      const priceMileage =
        distanceInt * milageRate + baseRate + durationInt * durationRate;

      const price = new Price({
        vehicleType: vehicleType,
        hours: hours,
        distance: distance,
        duration: duration,
        priceTotal: {
          hourly: 0,
          mileage: priceMileage,
        },
      });

      const savedPrice = await price.save();
      const newOrder = {
        ...order._doc,
        price: savedPrice,
      };
      return newOrder;
    },
  },
};

module.exports = resolvers;
