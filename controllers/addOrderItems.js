const Menu = require("../models/Menu");
const Order = require("../models/Order");

const addOrderItems = async (req, res) => {
  const { name, quantity } = req.body;
  let orderItems;

  try {
    const menu = await Menu.findOne({ name });
    const id = menu?.id;
    const find = { menu_id: id };
    const order = await Order.findOne(find);
    if (order) {
      const update = await Order.updateOne(
        { _id: order.id },
        { $set: { quantity: +quantity + order.quantity } }
      );
      res.json(update);
    } else {
      orderItems = new Order({
        quantity,
        menu_id: id,
      });
      orderItems.save();
      res.json(orderItems);
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = addOrderItems;
