const addMenuItems = require("./menu/addMenuItems");
const getMenu = require("./menu/getMenu");
const addOrderItems = require("./order/addOrderItems");
const getOrder = require("./order/getOrder");
const training = require("./chatbot/training");
const { getAllMessages, getMessages } = require("./chatbot/getMessage");
const addMessage = require("./chatbot/addMessage");

module.exports = {
  addMenuItems,
  getMenu,
  addOrderItems,
  getOrder,
  training,
  getAllMessages,
  addMessage,
  getMessages,
};
