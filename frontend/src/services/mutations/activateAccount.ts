import { gql } from '@apollo/client';

export default gql`
  mutation ActivateAccount($activateAccountInput: ActiveUserDto!) {
    activateUser(user: $activateAccountInput) {
      id
      firstName
      lastName
      email
      isActive
    }
  }
`;
