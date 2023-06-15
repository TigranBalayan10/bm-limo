const { Order, Price, Contact } = require("../models");
const { calculateRoute } = require("../utils/googleMapCalculation");
const { calculatePrice } = require("../utils/calculatePrice");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { ApolloError } = require("apollo-server-express");

const resolvers = {
  Query: {
    order: async () => {
      try {
        const orders = await Order.find().populate("price");
        return orders;
      } catch (error) {
        console.error("Error fetching orders:", error);
        throw error;
      }
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
    getContacts: async () => {
      return await Contact.find();
    },
    getContact: async (parent, { _id }) => {
      return await Contact.findById(_id);
    },
    getPublishableKey: () => {
      return process.env.STRIPE_PUBLISHABLE_KEY;
    },
  },

  Mutation: {
    createPaymentIntent: async (_, { priceId }) => {
      try {
        const price = await Price.findById(priceId);
        const checkoutPrice = calculatePrice(price);
        if (!price) {
          throw new ApolloError("Price not found");
        }
        const paymentIntent = await stripe.paymentIntents.create({
          amount: checkoutPrice * 100,
          currency: "usd",
          automatic_payment_methods: {
            enabled: true,
          },
          metadata: {
            name: `${price.firstName} ${price.lastName}`,
            email: price.email,
          },
        });
        const clientSecret = paymentIntent.client_secret.toString();
        return {
          clientSecret: clientSecret,
        };
      } catch (err) {
        throw new ApolloError("Failed to create payment intent", err);
      }
    },

    addOrder: async (parent, args) => {
      const order = await Order.create(args);
      const { pickUpAddress, dropOffAddress, hours, vehicleType, firstName, lastName, email } = args;
      console.log(firstName, lastName, email);
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
          firstName: firstName,
          lastName: lastName,
          email: email,
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
      const priceMileage = Math.round(
        distanceInt * milageRate + baseRate + durationInt * durationRate
      );

      const price = new Price({
        firstName: firstName,
        lastName: lastName,
        email: email,
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
    addContact: async (parent, args) => {
      const contact = await Contact.create(args);
      return contact;
    },
    deleteOrder: async (parent, { _id }) => {
      return await Order.findOneAndDelete({ _id: _id });
    },
    deletePrice: async (parent, { _id }) => {
      return await Price.findOneAndDelete({ _id: _id });
    },
  },
};

module.exports = resolvers;
