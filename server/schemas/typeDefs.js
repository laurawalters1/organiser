const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    username: String!
    email: String!
    password: String!
    _id: ID!
    todos: [Todo]
  }

  type UserAuth {
    token: ID!
    user: User
  }

  type Todo {
    title: String!
    description: String
    status: Boolean!
  }

  type Query {
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): UserAuth
    loginUser(email: String!, password: String!): UserAuth
    addTodo(title: String!, description: String, status: Boolean!): User
  }
`;

module.exports = typeDefs;
