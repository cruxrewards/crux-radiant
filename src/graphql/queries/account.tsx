import { gql } from "@apollo/client";

export const GET_ACCOUNT_INFO = gql`
  query GetAccountInfo {
    getAccountInfo {
      id
      email
      phoneConfirmed
      emailConfirmed
      status
      userDetail {
        firstName
        lastName
        dob
        phone
        street
        street2
        city
        region
        postalCode
        country
        govId
      }
    }
  }
`;

export const GET_CREDIT_INFO = gql`
  query GetCreditInfo {
    getCreditInfo {
      id
      lastFour
      expirationDate
    }
  }
`;