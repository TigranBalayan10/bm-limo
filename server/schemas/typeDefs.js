// import the gql tagged template function
const { gql } = require("apollo-server-express");

// create our typeDefs
const typeDefs = gql`
  type Query {
    order: [Order]
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
    }
`;
// export the typeDefs
module.exports = typeDefs;
