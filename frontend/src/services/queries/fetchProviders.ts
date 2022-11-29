import { gql } from '@apollo/client/core';

export default gql`
  {
    providers {
      id
      name
      group
      isActive
      user {
        id
      }
    }
  }
`;
