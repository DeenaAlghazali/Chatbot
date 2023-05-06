const addMessage = require("../messages/addMessage");
const { Menu, Order, Chat } = require("../../models");

const checkAddress = async (req, res) => {
  const orders = await Order.find();
  const meals = [];
  total_price = 0;

  orders.forEach(async (element) => {
    try {
      const result = await Menu.findById(element.menu_id);
      quantity = element.quantity;
      meals.push({
        name: result.name,
        price: result.price,
        quantity,
        total: result.price * quantity,
      });
      total_price += result.price * quantity;
    } catch (err) {
      console.log(err);
    }
  });

  await addMessage({
    cookie: req.cookies["message"],
    message: `Your order: `,
    type: "sent",
    payload: {
      step: "greeting",
      meals,
      totalPrice: `total price = ${total_price}`,
    },
  });

  const deleteAllDataOrder = async () => {
    try {
      await Order.deleteMany();
      console.log("All Data successfully deleted");
    } catch (err) {
      console.log(err);
    }
  };

  const deleteChat = async () => {
    try {
      await Chat.deleteMany();
      console.log("Chat was successfully deleted");
    } catch (err) {
      console.log(err);
    }
  };
  res.clearCookie("id");
  res.clearCookie("message");

  setTimeout(() => {
    deleteAllDataOrder();
    deleteChat();
  }, 10000);

  return res.json({
    data: [
      {
        message: "Your order: ",
        meals,
        totalPrice: `total price = ${total_price}`,
      },
    ],
  });
};

module.exports = checkAddress;
