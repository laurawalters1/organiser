const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");
const { isConstValueNode } = require("graphql");
const { User } = require("../models");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      return "hello";
    },
  },
  Mutation: {
    //////////////////////////////////////
    //////////////SIGNUP///////////////////
    //////////////////////////////////////
    addUser: async (parent, args) => {
      const user = await User.create(args);
      // generate token
      const token = signToken(user);
      return { token, user };
    },
  },
};
module.exports = resolvers;
