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
