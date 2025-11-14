import { gql } from "apollo-boost";

export const GET_COPS = gql`
  query {
    getCenOpInMongo{
      _id,
      nombre
    }
  }
`;
