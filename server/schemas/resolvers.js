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

    loginUser: async (parent, { email, password }, context) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Email not found!");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect password!");
      }
      const token = signToken(user);

      return { token, user };
    },
  },
};
module.exports = resolvers;
