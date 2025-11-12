import { VehicleDataSource } from '../../data/vehiclesdata';
const vehiclesResolver = {
    Query: {
        getVehicleByPlate: (parent, { placa }) => {
            return VehicleDataSource.filter(vehicle => vehicle.placa.toUpperCase() === placa.toUpperCase());
        },
        getVehicles() {
            return VehicleDataSource;
        }
    },
    Mutation: {
        createVehicle: (parent, { input }) => {
            const newVehicle = {
                placa: String(VehicleDataSource.length + 1), // temporal
                ...input
            };
            VehicleDataSource.push(newVehicle);
            return newVehicle;
        },
        updateVehicle: (parent, { placa, input }) => {
            const vehicleIndex = VehicleDataSource.findIndex(v => v.placa === placa);
            if (vehicleIndex === -1) {
                throw new Error(`Vehicle with placa ${placa} not found.`);
            }
            const updatedVehicle = {
                ...VehicleDataSource[vehicleIndex],
                ...input,
            };
            VehicleDataSource[vehicleIndex] = updatedVehicle;
            return updatedVehicle;
        },
        deleteVehicle: (parent, { placa }) => {
            const vehicleIndex = VehicleDataSource.findIndex(v => v.placa === placa);
            if (vehicleIndex === -1) {
                throw new Error(`Vehicle with placa ${placa} not found.`);
            }
            VehicleDataSource.splice(vehicleIndex, 1);
            return true;
        }
    }
};
export default vehiclesResolver;
