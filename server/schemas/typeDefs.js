const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    username: String!
    email: String!
    password: String!
    _id: ID!
  }

  type UserAuth {
    token: ID!
    user: User
  }

  type Query {
    me: String
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): UserAuth
    loginUser(email: String!, password: String!): UserAuth
  }
`;

module.exports = typeDefs;
