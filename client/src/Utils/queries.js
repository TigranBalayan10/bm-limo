import { gql } from "@apollo/client";

export const QUERY_PRICE = gql`
  query GetPrice($id: ID!) {
    getPrice(_id: $id) {
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
    }
  }
`;
