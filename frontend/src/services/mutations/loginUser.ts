import { gql } from '@apollo/client';

export default gql`
  mutation login($input: LoginUserInput!) {
    login(loginUserInput: $input) {
      accessToken
      user {
        firstName
        lastName
        email
        isActive
        isProvider
      }
    }
  }
`;
