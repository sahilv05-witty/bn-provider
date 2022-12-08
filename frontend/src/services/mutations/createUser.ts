import { gql } from '@apollo/client';

export default gql`
  mutation CreateUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $roleId: Int!
    $providerId: Int
    $useSalutation: Boolean
  ) {
    createUser(
      user: {
        firstName: $firstName
        lastName: $lastName
        email: $email
        roleId: $roleId
        providerId: $providerId
        useSalutation: $useSalutation
      }
    ) {
      activationToken
      user {
        id
        firstName
        lastName
        email
        isActive
        isProvider
      }
    }
  }
`;
