import { IResolvers } from '@graphql-tools/utils';
import { VehicleDataSource } from '../../data/vehiclesdata';
import { Db } from 'mongodb';


interface Context {
  db: Db;
}

const vehiclesResolver: IResolvers = {
  Query: {
    getVehicleByPlate: (parent, { placa }) => {
      return VehicleDataSource.filter(vehicle => 
        vehicle.placa.toUpperCase() === placa.toUpperCase()
      );
    },
    
    getVehicleInMongo: async (parent, args, context: Db) => {
            try {
                return await context.collection('vehicle').find().toArray() ?? [];
            } catch (error) {
                console.log(error);
            }
        },
    getVehicles: () => {
      return VehicleDataSource;
    }
  },

  Mutation: {
    createVehicle: (parent, { input }) => {
      const newVehicle = {
        placa: String(VehicleDataSource.length + 1), 
        ...input
      };

      VehicleDataSource.push(newVehicle);
      return newVehicle;
    },

    createVehicleInMongo: async (root: void, args: any, context: Db) => {
            try {
                const vehicle = await context.collection('vehicle').insertOne(args.vehicle);
                return "Vehicle created successfully";
            } catch (error) {
                console.log(error);
            }
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

    deleteVehicle: async (parent, { placa }, context: Db) => {
  try {
    const result = await context
      .collection("vehicle")
      .deleteOne({ placa: placa });

    if (result.deletedCount === 0) {
      throw new Error(`Vehicle with placa ${placa} not found.`);
    }

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

  }
};

export default vehiclesResolver;