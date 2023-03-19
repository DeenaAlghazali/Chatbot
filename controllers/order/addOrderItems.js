const Menu = require("../../models/Menu");
const Order = require("../../models/Order");

const addOrderItems = async (name, quantity) => {
  try {
    const meal = await Menu.findOne({ name });
    if (meal) {
      const id = meal?.id;
      const order = await Order.findOne({ menu_id: meal?.id });
      if (order) {
        await Order.updateOne(
          { _id: order.id },
          { $set: { quantity: +quantity + order.quantity } }
        );
        return order;
      } else {
        let newOrder = await new Order({
          quantity,
          menu_id: id,
        }).save();
        return newOrder;
      }
    } else {
      return false;
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = addOrderItems;
