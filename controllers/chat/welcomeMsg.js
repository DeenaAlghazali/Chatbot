const { addMessage } = require("../messages");
const { Menu } = require("../../models");

const meals = [];

const welcomeMsg = async (res) => {
  res.cookie("id", "chatbot");

  const getAllItems = await Menu.find();

  if (meals.length === 0) {
    getAllItems.forEach(({ name, price }) => {
      meals.push({ name, price });
    });
  }
  await addMessage({
    cookie: "1234",
    message: "Welcome to our restaurant, what would you like to order?",
    type: "sent",
    payload: {
      step: "greeting",
      meals,
    },
  });
  res.cookie("message", "1234");
  return res.json({
    data: [
      {
        message: `Welcome to our restaurant, what would you like to order?`,
        meals,
        type: "sent",
      },
    ],
  });
};

module.exports = welcomeMsg;
