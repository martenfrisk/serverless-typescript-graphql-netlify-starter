
import { ApolloServer } from 'apollo-server'
import { ApolloServer as ApolloServerLambda } from 'apollo-server-lambda'
import depthLimit from 'graphql-depth-limit'
import resolvers from './resolvers'
import typeDefs from './resources'
import errorFormatter from './errors/ErrorFormatter'

const validationRules = [
	depthLimit(3),
];

function createLambdaServer () {
	return new ApolloServerLambda({
    typeDefs,
    resolvers,
    context: {
        baseUrl: `https://www.thesportsdb.com/api/v1/json/1/`,
    },
    formatError: errorFormatter,
    validationRules,
    introspection: true,
    playground: true,
  });
}

function createLocalServer () {
	return new ApolloServer({
    typeDefs,
    resolvers,
    context: {
        baseUrl: `https://www.thesportsdb.com/api/v1/json/1/`,
    },
    formatError: errorFormatter,
    validationRules,
    introspection: true,
    playground: true,
  });
}

export { createLambdaServer, createLocalServer }
