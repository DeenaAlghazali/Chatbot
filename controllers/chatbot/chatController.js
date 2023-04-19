const addOrderItems = require("../order/addOrderItems");
const addMessage = require("./addMessage");
const Menu = require("../../models/Menu");
const Order = require("../../models/Order");
const Chat = require("../../models/Chat");

const meals = [];

async function checkIfInMenu(res, msg, meals) {
  let meal = await meals.filter((meal) => meal.name == msg);
  if (meal) {
    await addMessage({
      cookie: "test",
      message: `You ordered ${meal[0].name}, How many?`,
      type: "sent",
      payload: {
        order: meal[0],
        step: "order",
      },
    });
    return res.json({
      data: [{ message: `You ordered ${meal[0].name}, How many?` }],
    });
  }
  return res.json({
    data: [{ message: "Sorry the meal dose not exist" }],
  });
}

async function checkQuantity(msg, res, lastMsg) {
  let quantity = msg.match(/(\d+)/) ? parseInt(msg.match(/(\d+)/)[0]) : "";
  if (typeof quantity == "number") {
    await addMessage({
      cookie: "test",
      message: `you ordered ${quantity}`,
      type: "sent",
      payload: {
        quantity: quantity,
        step: "quantity",
        order: lastMsg.payload?.order,
      },
    });

    return res.json({
      data: [
        {
          message: `you ordered ${quantity} and Your total price is ${
            quantity * lastMsg.payload?.order?.price
          } Do you need anything else?`,
        },
      ],
    });
  } else {
    return res.json({
      data: [{ message: "You must enter a numeric value of quantity" }],
    });
  }
}

async function confirmOrder(req, res, lastMsg) {
  addOrderItems(lastMsg.payload.order.name, lastMsg.payload.quantity);
  if (req.params.msg == "yes") {
    await addMessage({
      cookie: "test",
      message: `what do you want?`,
      type: "sent",
      payload: {
        step: "greeting",
      },
    });

    return res.json({
      data: [{ message: "what do you want?" }],
    });
  } else if (req.params.msg == "no") {
    await addMessage({
      cookie: "test",
      message: `Please enter your address`,
      type: "sent",
      payload: {
        step: "address",
      },
    });
    return res.json({
      data: [{ message: "Please enter your address" }],
    });
  }
}

async function checkAddress(req, res) {
  await addMessage({
    cookie: "test",
    message: `You Ordered`,
    type: "sent",
    payload: {
      step: "greeting",
    },
  });

  const orders = await Order.find();
  const meals = [];
  total_price = 0;

  for (const element of orders) {
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
  }

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

  setTimeout(() => {
    console.log(req.cookies);
    deleteAllDataOrder();
    deleteChat();
  }, 10000);

  return res.json({
    data: [
      { message: "Your order: " },
      { meals },
      { totalPrice: `total price = ${total_price}` },
    ],
  });
}

async function welcomeMsg(res) {
  res.cookie("id", "chatbot");

  const getAllItems = await Menu.find();

  if (meals.length === 0) {
    getAllItems.forEach(({ name, price }) => {
      meals.push({ name, price });
    });
  }
  await addMessage({
    cookie: "test",
    message: "Welcome what do you need to order?",
    type: "sent",
    payload: {
      step: "greeting",
    },
  });

  return res.json({
    data: [
      { message: `Welcome to our restaurant, what would you like to order?` },
      { meals },
    ],
  });
}

module.exports = {
  checkIfInMenu,
  checkQuantity,
  confirmOrder,
  checkAddress,
  welcomeMsg,
};
