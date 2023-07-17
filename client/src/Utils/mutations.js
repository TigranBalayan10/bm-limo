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
    $flightNumber: String
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
      flightNumber: $flightNumber
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
      paymentStatus
      createdAt
      price {
        _id
        firstName
        lastName
        email
        vehicleType
        hours
        distance
        duration
        priceTotal {
          hourly
          mileage
        }
        flatRate {
          id
          flatPrice
          flatDropOff
        }
      }
      flightNumber
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
  mutation CreatePaymentIntent($orderId: ID!) {
    createPaymentIntent(orderId: $orderId) {
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

export const EDIT_ORDER = gql`
  mutation EditOrder($id: ID!, $paymentStatus: String) {
    editOrder(_id: $id, paymentStatus: $paymentStatus) {
      paymentStatus
      _id
    }
  }
`;
