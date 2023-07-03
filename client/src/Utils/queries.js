import { gql } from "@apollo/client";

export const QUERY_PRICE = gql`
  query GetPrice($id: ID!) {
    getPrice(_id: $id) {
      _id
      vehicleType
      hours
      distance
      duration
      lastName
      firstName
      email
      priceTotal {
        hourly
        mileage
      }
    }
  }
`;

export const QUERY_ORDER = gql`
  query GetOrder($id: ID!) {
  getOrder(_id: $id) {
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
        currency
      }
    }
  }
}
`;

export const GET_PUBLISHABLE_KEY = gql`
  query Query {
    getPublishableKey
  }
`;

export const GET_ORDERS = gql`
  query Order {
    order {
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
        vehicleType
        priceTotal {
          mileage
          hourly
        }
        hours
        duration
        distance
        _id
      }
      createdAt
    }
  }
`;
