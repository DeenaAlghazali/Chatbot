const addMenuItems = require("./menu/addMenuItems");
const getMenu = require("./menu/getMenu");
const addOrderItems = require("./order/addOrderItems");
const getOrder = require("./order/getOrder");
const training = require("./chat/training");
const { getAllMessages } = require("./messages/getMessage");

module.exports = {
  addMenuItems,
  getMenu,
  addOrderItems,
  getOrder,
  training,
  getAllMessages,
};
