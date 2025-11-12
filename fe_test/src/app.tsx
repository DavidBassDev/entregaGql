import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_VEHICLES } from "./queries/vehicleQuery";

const VehicleList = () => {
  const { loading, error, data } = useQuery(GET_VEHICLES);

  if (loading) return <p>Cargando vehículos...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Protección contra undefined
  const vehicles = data?.getVehicleInMongo ?? [];

  return (
    <div>
      <h2>Vehiculos registrados en BD</h2>
      {vehicles.length === 0 ? (
        <p>No hay vehiculos registrados.</p>
      ) : (
        vehicles.map((v) => (
          <div key={v.placa}>
            <strong>{v.placa}</strong> — {v.tipoVehiculo} — Rendimiento:{" "}
            {v.rendimientoTeorico}
          </div>
        ))
      )}
    </div>
  );
};

export default VehicleList;
