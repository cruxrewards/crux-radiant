import { gql } from "@apollo/client";

export const COMPLETE_BANK_VERIFICATION = gql`
  mutation CompleteBankVerification($publicToken: String!, $metadata: JSON!) {
    completeBankVerification( publicToken: $publicToken, metadata: $metadata) {
      status
    }
  }
`;
