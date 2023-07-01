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
    $messageText: String!
  ) {
    addContact(
      firstName: $firstName
      lastName: $lastName
      email: $email
      messageText: $messageText
    ) {
      _id
      firstName
      lastName
      email
      messageText
    }
  }
`;

export const DELETE_ORDER = gql`
  mutation DeleteOrder($id: ID!) {
    deleteOrder(_id: $id) {
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
    }
  }
`;

export const DELETE_PRICE = gql`
  mutation DeletePrice($id: ID!) {
    deletePrice(_id: $id) {
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
`;

export const CREATE_PAYMENT_INTENT = gql`
  mutation CreatePaymentIntent($priceId: ID!) {
    createPaymentIntent(priceId: $priceId) {
      clientSecret
    }
  }
`;

export const LOGIN_ADMIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      admin {
        _id
        username
      }
    }
  }
`;
