const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");
const { isConstValueNode } = require("graphql");
const { User, Todo } = require("../models");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      const user = User.findById(context.user._id);

      return user.populate({
        path: "todos",
        model: "Todo",
      });
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

    //////////////////////////////////////
    //////////////TODO///////////////////
    //////////////////////////////////////

    addTodo: async (parent, args, context) => {
      const todo = await Todo.create(args);
      const user = User.findByIdAndUpdate(
        { _id: context.user._id },
        {
          $addToSet: {
            todos: todo._id,
          },
        },

        { new: true, runValidators: true }
      );

      return user.populate({
        path: "todos",
        model: "Todo",
      });
    },

    completeTodo: async (parent, { taskId }, context) => {
      const todo = await Todo.findByIdAndUpdate(
        { _id: taskId },
        { status: true },
        { new: true, runValidators: true }
      );

      const user = User.findById(context.user._id);

      return user.populate({
        path: "todos",
        model: "Todo",
      });
    },

    deleteTodo: async (parent, { taskId }, context) => {
      const todo = await Todo.findByIdAndDelete({ _id: taskId });

      const user = User.findByIdAndUpdate(
        { _id: context.user._id },
        { $pull: { todos: taskId } },
        { new: true, runValidators: true }
      );

      return user.populate({
        path: "todos",
        model: "Todo",
      });
    },
  },
};

module.exports = resolvers;
