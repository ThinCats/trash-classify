const server = require('vue-cli-plugin-apollo/graphql-server')
const BASE_DIR = './'

const opts = {
  host: process.env.SERVER_GRAPHQL_HOST || '0.0.0.0',
  port: 4000,
  graphqlPath: '/graphql',
  subscriptionsPath: '/graphql',
  enableMocks: false,
  enableEngine: false,
  cors: '*',
  timeout: 1000000,
  quiet: false,
  paths: {
    typeDefs: require.resolve(`${BASE_DIR}/type-defs.js`),
    resolvers: require.resolve(`${BASE_DIR}/resolvers.js`),
    context: require.resolve(`${BASE_DIR}/context.js`),
    // pubsub: require.resolve(`${BASE_DIR}/pubsub.js`),
    server: require.resolve(`${BASE_DIR}/server.js`),
    directives: require.resolve(`${BASE_DIR}/directives.js`),
    dataSources: require.resolve(`${BASE_DIR}/data-sources.js`)
  }
}

server(opts, () => {
  console.log('Server is running!')
})
