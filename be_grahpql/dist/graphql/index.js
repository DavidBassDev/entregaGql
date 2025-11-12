import { makeExecutableSchema } from "graphql-tools";
import { mergeTypeDefs } from "@graphql-tools/merge";
import 'graphql-import-node';
import vehiclesResolver from "./resolvers/vehicles";
import centroOperacionResolver from "./resolvers/centroOperacion";
import vehiclesSchema from './schemas/vehicles.graphql';
import centroOpsSchema from './schemas/centroOperacion.graphql';
export const schema = makeExecutableSchema({
    typeDefs: mergeTypeDefs([
        vehiclesSchema,
        centroOpsSchema
    ]),
    resolvers: [centroOperacionResolver, vehiclesResolver]
});
