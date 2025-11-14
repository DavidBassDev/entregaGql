import { gql } from "apollo-boost";

export const GET_VEHICLES = gql`
  query {
    getVehicleInMongo {
      placa
      tipoVehiculo
      rendimientoTeorico
      CentroOperacion {
        id
      }
    }
  }
`;
