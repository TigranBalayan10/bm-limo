// import the gql tagged template function
const { gql } = require("apollo-server-express");

// create our typeDefs
const typeDefs = gql`
  type Query {
    order: [Order]
    getOrder(_id: ID!): Order
    getPrice (_id: ID!): Price
    getPrices: [Price]
    getContacts: Contact
    getContact(_id: ID!): Contact
  }

  type Contact {
    _id: ID
    firstName: String!
    lastName: String!
    email: String!
    massage: String!
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
      addContact(
      firstName: String!
      lastName: String!
      email: String!
      massage: String!
    ): Contact
  }
`;
// export the typeDefs
module.exports = typeDefs;
