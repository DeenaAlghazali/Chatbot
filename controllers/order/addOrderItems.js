const Menu = require("../../models/Menu");
const Order = require("../../models/Order");

const addOrderItems = async (req, res) => {
  const { name, quantity } = req.body;

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
        res.json("Success");
      } else {
        new Order({
          quantity,
          menu_id: id,
        }).save();
        res.json("Success");
      }
    } else {
      res.json("Meal not found yet in our menu");
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = addOrderItems;
