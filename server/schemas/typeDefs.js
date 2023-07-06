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

  type EditOrder {
    paymentStatus: paymentStatus
  }

  type Contact {
    _id: ID
    firstName: String!
    lastName: String!
    email: String!
    messageText: String!
    createdAt: String
  }

  enum paymentStatus {
    Failed
    Success
    Pending
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
    paymentStatus: paymentStatus
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
    editOrder(_id: ID!, paymentStatus: paymentStatus): Order!
    deleteOrder(_id: ID!): Order
    deletePrice(_id: ID!): Price
    createPaymentIntent(orderId: ID!): paymentIntent
    login(username: String!, password: String!): Auth
    addAdmin(username: String!, password: String!): Auth
  }
`;
// export the typeDefs
module.exports = typeDefs;
