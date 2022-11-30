import { gql } from '@apollo/client/core';

export default gql`
  {
    roles {
      id
      code
      name
    }
  }
`;
