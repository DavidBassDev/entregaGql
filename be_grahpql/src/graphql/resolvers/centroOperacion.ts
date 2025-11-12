import { IResolvers } from '@graphql-tools/utils';
import { CopsDataSource } from '../../data/copsdata';
import { Db } from 'mongodb';

interface Context {
  db: Db;
}

const centroOperacionResolver: IResolvers = {
  Query: {
    getCos() {
      return CopsDataSource;
    },

    getCenOpInMongo: async (parent, args, context: Db) => {
      try {
                return await context.collection('cop').find().toArray() ?? [];
            } catch (error) {
                console.log(error);
            }
    },
  },

  Mutation: {
    
    createCopInMongo: async (root: void, args: any, context: Db) => {
            try {
                 console.log("🟡 args:", args);
                const centroOperacion = await context.collection('cop').insertOne(args.cop);
                return "centro operacion created successfully";
            } catch (error) {
                console.error("❌ Error:", error);
            }
        },
    },
  }


export default centroOperacionResolver;