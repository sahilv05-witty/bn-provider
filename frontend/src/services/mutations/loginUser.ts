import { gql } from '@apollo/client';

export default gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      createdBy
      createdAt
      updatedBy
      updatedAt
      firstName
      lastName
      email
      isActive
      termsAcceptedAt
      lastLoggedInAt
      isProvider
      role {
        id
        name
        code
      }
      provider {
        id
        name
        group
      }
    }
  }
`;
