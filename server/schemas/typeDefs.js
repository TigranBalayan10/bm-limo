// import the gql tagged template function
const { gql } = require("apollo-server-express");

// create our typeDefs
const typeDefs = gql`
  type Query {
    adminMe: Admin
    order: [Order]
    getOrder(_id: ID!): Order
    getPrice (_id: ID!): Price
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


  type Contact {
    _id: ID
    firstName: String!
    lastName: String!
    email: String!
    messageText: String!
    createdAt: String
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
    createdAt: String
    price: Price
  }
  
  type TotalPrice {
    hourly: Float
    mileage: Float
    currency: String
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
      messageText: String!
    ): Contact
    deleteOrder(_id: ID!): Order
    deletePrice(_id: ID!): Price
    createPaymentIntent(priceId: ID!): paymentIntent
    login(username: String!, password: String!): Auth
    addAdmin(username: String!, password: String!): Auth
  }
`;
// export the typeDefs
module.exports = typeDefs;
