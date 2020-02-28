const { GraphQLServer } = require('graphql-yoga');

const db = require('./db');
const typeDefs = require('./schema/Gdb');
const resolvers = require('./resolvers/Gdb');

function createServer () {
  return new GraphQLServer({
    debug: true,
    typeDefs,
    resolvers,
    context: req => ({ ...req, db })
  });
};

module.exports = createServer;
