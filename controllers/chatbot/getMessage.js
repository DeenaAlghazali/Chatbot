const Chat = require("../../models/Chat");

const getMessages = async () => {
  const messages = await Chat.find({
    $and: [{ type: "sent" }, { cookie: "1234" }],
  });
  return messages;
};

const getAllMessages = async (req, res) => {
  const messages = await Chat.find();
  return res.json(messages);
};

module.exports = { getMessages, getAllMessages };
