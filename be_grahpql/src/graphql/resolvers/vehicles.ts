import { IResolvers } from '@graphql-tools/utils';
import { VehicleDataSource } from '../../data/vehiclesdata';
import { Db } from 'mongodb';
import { ObjectId } from "mongodb";

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
        return [];
      }
    },
    
    getVehicles: () => {
      return VehicleDataSource;
    }
  },

  Mutation: {
    createVehicleInMongo: async (root, args, context: Db) => {
      try {
        const newVehicle = {
          placa: args.vehicle.placa,
          tipoVehiculo: args.vehicle.tipoVehiculo,
          rendimientoTeorico: args.vehicle.rendimientoTeorico,
          CentroOperacion: args.vehicle.CentroOperacion
            ? new ObjectId(args.vehicle.CentroOperacion)
            : null
        };

        const result = await context.collection("vehicle").insertOne(newVehicle);

        return {
          _id: result.insertedId,
          ...newVehicle
        };
      } catch (error) {
        console.log(error);
        throw error;
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
  },

  // RESOLVER PARA LA RELACIÓN CentroOperacion - AÑADIDO AQUÍ
  Vehicle: {
    CentroOperacion: async (vehicle, args, context: Db) => {
      // Si no hay CentroOperacion, retorna null
      if (!vehicle.CentroOperacion) {
        return null;
      }
      
      try {
        // Busca el centro de operación en la base de datos
        // NOTA: Ajusta 'centro_operacion' por el nombre real de tu colección
        const centro = await context
          .collection('cop') // Cambia esto si es necesario
          .findOne({ _id: new ObjectId(vehicle.CentroOperacion) });
        
        return centro;
      } catch (error) {
        console.error('Error fetching CentroOperacion:', error);
        return null;
      }
    }
  }
};

export default vehiclesResolver;