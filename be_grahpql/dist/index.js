import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express4';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { schema } from './graphql/';
const app = express();
app.use(cors(), bodyParser.json());
const server = new ApolloServer({
    schema,
    introspection: true,
    plugins: [ApolloServerPluginLandingPageLocalDefault()],
});
await server.start();
app.use('/graphql', expressMiddleware(server));
app.listen(4000, () => {
    console.log(`🚀 Server ready at http://localhost:4000/graphql`);
});
