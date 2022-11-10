const { Schema, model } = require("mongoose");

const moment = require("moment");

const todoSchema = new Schema(
  {
    createdAt: {
      type: Date,
      default: Date.now,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    status: {
      type: Boolean,
      required: true,
    },
  },

  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Todo = model("Todo", todoSchema);

module.exports = Todo;
