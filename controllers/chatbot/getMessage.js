const Chat = require("../../models/Chat");

const getMessages = async () => {
  const messages = await Chat.find({ type: "sent" });
  return messages;
};

const getAllMessages = async (req, res) => {
  const messages = await Chat.find();
  return res.json(messages);
};

module.exports = { getMessages, getAllMessages };
