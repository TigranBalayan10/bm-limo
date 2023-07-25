// import the gql tagged template function
const { gql } = require("apollo-server-express");

// create our typeDefs
const typeDefs = gql`
  type Query {
    adminMe: Admin
    order: [Order]
    getOrder(_id: ID!): Order
    getPrice(_id: ID!): Price
    getPrices: [Price]
    getContacts: Contact
    getContact(_id: ID!): Contact
    getPublishableKey: String
  }

  type paymentIntent {
    clientSecret: String
  }

  type Admin {
    _id: ID
    username: String!
    password: String!
  }

  type Auth {
    token: ID!
    admin: Admin
  }

  type EditOrder {
    paymentStatus: String
  }

  type Contact {
    _id: ID
    firstName: String!
    lastName: String!
    email: String!
    messageText: String!
    createdAt: String
  }

  type FlightInfo {
    departureAirport: String
    scheduledArrivalTime: String
    actualArrivalTime: String
    arrivalAirport: String
    arrivalTerminal: String
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
    paymentStatus: String
    clientSecret: String
    flightNumber: String
    flightInfo: FlightInfo
    createdAt: String
    price: Price
  }

  type TotalPrice {
    hourly: Float
    mileage: Float
    currency: String
  }

  type FlatRate {
    id: ID!
    flatPrice: Int
    flatDropOff: String
  }

  type Price {
    _id: ID
    firstName: String!
    lastName: String!
    email: String!
    vehicleType: String
    hours: Int
    distance: String
    duration: String
    priceTotal: TotalPrice
    flatRate: FlatRate
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
      flightNumber: String
    ): Order
    addContact(
      firstName: String!
      lastName: String!
      email: String!
      messageText: String!
    ): Contact
    editOrder(_id: ID!, paymentStatus: String): Order!
    deleteOrder(_id: ID!): Order
    deletePrice(_id: ID!): Price
    createPaymentIntent(orderId: ID!): paymentIntent
    login(username: String!, password: String!): Auth
    addAdmin(username: String!, password: String!): Auth
  }
`;
// export the typeDefs
module.exports = typeDefs;
