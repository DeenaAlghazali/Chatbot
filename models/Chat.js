const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    payload: {
      type: Object,
      required: false,
    },
    cookie: {
      type: String,
      required: false,
    },
  },
  { id: true }
);

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
