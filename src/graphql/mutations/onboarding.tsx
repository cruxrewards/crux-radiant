import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CreateUser($authProvider: AuthProviderSignupData!) {
    createUser( authProvider: $authProvider) {
      id
      emailConfirmation
      authenticationToken
    }
  }
`;

export const CONFIRM_EMAIL = gql`
  mutation ConfirmEmail($confirmationToken: String!) {
    confirmEmail( confirmationToken: $confirmationToken) {
      status
    }
  }
`;

export const CONFIRM_PHONE = gql`
  mutation ConfirmPhone($confirmationToken: String!) {
    confirmPhone( confirmationToken: $confirmationToken) {
      status
    }
  }
`;

export const COMPLETE_APPLICATION = gql`
  mutation CompleteApplication {
    completeApplication {
      status
    }
  }
`;