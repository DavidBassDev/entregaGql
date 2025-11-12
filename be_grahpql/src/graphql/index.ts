import {GraphQLSchema} from 'graphql';
import 'graphql-import-node';
import { makeExecutableSchema, mergeSchemas } from '@graphql-tools/schema';
import { mergeTypeDefs } from '@graphql-tools/merge';
import 'graphql-import-node';
import vehiclesResolver from "./resolvers/vehicles";
import centroOperacionResolver from "./resolvers/centroOperacion";
import vehiclesSchema from './schemas/vehicles.graphql';
import centroOpsSchema from './schemas/centroOperacion.graphql';
import userSchema from './schemas/users.graphql';
import postSchema from './schemas/posts.graphql';
import userResolver from './resolvers/user';
import PostResolver from './resolvers/posts';

export const schema: GraphQLSchema = makeExecutableSchema({
typeDefs: mergeTypeDefs([
    vehiclesSchema,
    centroOpsSchema,
    userSchema,
    postSchema,
]),
resolvers:[centroOperacionResolver,vehiclesResolver,userResolver,PostResolver]     
});