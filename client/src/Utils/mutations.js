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
      dropOffAddress: $dropOffAddress
      email: $email
      phoneNumber: $phoneNumber
      hours: $hours
    ) {
      _id
      firstName
      lastName
      dateInfo
      time
      vehicleType
      pickUpAddress
      dropOffAddress
      email
      phoneNumber
      hours
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
    }
  }
`;

export const ADD_CONTACT = gql`
  mutation AddContact(
    $firstName: String!
    $lastName: String!
    $email: String!
    $massage: String!
  ) {
    addContact(
      firstName: $firstName
      lastName: $lastName
      email: $email
      massage: $massage
    ) {
      massage
      lastName
      firstName
      email
      _id
    }
  }
`;
