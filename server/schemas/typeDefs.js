// import the gql tagged template function
const { gql } = require("apollo-server-express");

// create our typeDefs
const typeDefs = gql`
  type Query {
    order: [Order]
    getOrder(_id: ID!): Order
  }

  type Order {
    _id: ID
    firstName: String
    lastName: String
    dateTime: String
    vehicleType: String
    hours: Int
    passengerNumber: Int
    pickUpAddress: String
    dropOffAddress: String
    email: String
    phoneNumber: String
    createdAt: String
  }
  type TotalPrice {
    hourly: Int
    mileage: Int
  }

  type Price {
    _id: ID
    vehicleType: String
    hours: Int
    distance: Int
    duration: Int
    price: TotalPrice
  }

  type Mutation {
    addOrder(
      firstName: String
      lastName: String
      dateTime: String
      vehicleType: String
      hours: Int
      passengerNumber: Int
      pickUpAddress: String
      dropOffAddress: String
      email: String
      phoneNumber: String
    ): Order
    createPrice(
        vehicleType: String!
        hours: Int
        distance: Int
        duration: Int
    ): Price!
  }
`;
// export the typeDefs
module.exports = typeDefs;
