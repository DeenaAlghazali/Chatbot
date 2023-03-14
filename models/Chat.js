const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    botMessage: {
      type: String,
      required: true,
    },
    userMessage: {
      type: String,
      required: true,
    },
  },
  { id: true }
);


const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
