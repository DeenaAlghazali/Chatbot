const Order = require("../../models/Order");

const getOrder = async (req, res) => {
  const getAllItems = await Order.find();
  res.status(200).json({ data: getAllItems });
};

module.exports = getOrder;
