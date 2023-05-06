const Chat = require("../../models/Chat");

const addMessage = async (message) => {
  const chatMessage = new Chat({
    message: message.message,
    type: message.type,
    payload: message.payload,
    cookie: message.cookie,
  });
  await chatMessage.save();
};

module.exports = addMessage;
