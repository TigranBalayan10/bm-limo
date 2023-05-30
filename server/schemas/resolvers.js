const { Order } = require("../models");

const resolvers = {
  Query: {
    order: async () => {
      return await Order.find();
    },
  },

  Mutation: {
    addOrder: async (parent, args) => {
      const order = await Order.create(args);

      return order;
    },
  },
};

module.exports = resolvers;
