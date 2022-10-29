const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    me: String
  }
`;

module.exports = typeDefs;
