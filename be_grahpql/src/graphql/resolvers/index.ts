import { IResolvers } from '@graphql-tools/utils';
import GMR from 'graphql-merge-resolvers';
import centroOperacionResolver from './centroOperacion';
import vehiclesResolver from './vehicles';
import userResolver from './user';

const resolver: any = GMR.merge({
    centroOperacionResolver,
    vehiclesResolver,
    userResolver
})



export default resolver;