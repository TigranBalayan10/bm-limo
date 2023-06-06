// import the gql tagged template function
const { gql } = require("apollo-server-express");

// create our typeDefs
const typeDefs = gql`
  type Query {
    order: [Order]
    getOrder(_id: ID!): Order
    getPrice (_id: ID!): Price
  }

  type Order {
    _id: ID
    firstName: String!
    lastName: String!
    dateInfo: String!
    time: String!
    vehicleType: String!
    hours: Int
    pickUpAddress: String!
    dropOffAddress: String
    email: String!
    phoneNumber: String!
    price: Price
    createdAt: String
  }
  type TotalPrice {
    hourly: Float
    mileage: Float
  }

  type Price {
    _id: ID
    vehicleType: String
    hours: Int
    distance: String
    duration: String
    priceTotal: TotalPrice
  }

  type Mutation {
    addOrder(
      firstName: String!
      lastName: String!
      dateInfo: String!
      time: String!
      vehicleType: String!
      hours: Int
      pickUpAddress: String!
      dropOffAddress: String
      email: String!
      phoneNumber: String!
    ): Order

  }
`;
// export the typeDefs
module.exports = typeDefs;
