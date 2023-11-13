import { gql } from "@apollo/client";

export const GET_LINK_TOKEN = gql`
  query GetLinkToken {
    getLinkToken {
      linkToken
    }
  }
`;

export const GET_PLAID_BANK_ACCOUNTS = gql`
  query GetPlaidBankAccounts {
    getPlaidBankAccounts {
      mask
    }
  }
`;