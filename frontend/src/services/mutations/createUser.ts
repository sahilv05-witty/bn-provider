import { gql } from '@apollo/client';

export default gql`
  mutation CreateUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $roleId: Float!
  ) {
    createUser(
      user: {
        firstName: $firstName
        lastName: $lastName
        email: $email
        roleId: $roleId
      }
    ) {
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
