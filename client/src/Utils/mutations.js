import { gql } from "@apollo/client";

export const ADD_ORDER = gql`
  mutation AddOrder(
    $firstName: String!
    $lastName: String!
    $dateInfo: String!
    $time: String!
    $vehicleType: String!
    $pickUpAddress: String!
    $email: String!
    $phoneNumber: String!
    $hours: Int
    $dropOffAddress: String
  ) {
    addOrder(
      firstName: $firstName
      lastName: $lastName
      dateInfo: $dateInfo
      time: $time
      vehicleType: $vehicleType
      pickUpAddress: $pickUpAddress
      email: $email
      phoneNumber: $phoneNumber
      hours: $hours
      dropOffAddress: $dropOffAddress
    ) {
      _id
      firstName
      lastName
      dateInfo
      time
      vehicleType
      hours
      pickUpAddress
      dropOffAddress
      email
      phoneNumber
      price {
        _id
        vehicleType
        hours
        distance
        duration
        priceTotal {
          hourly
          mileage
        }
      }
      createdAt
    }
  }
`;
