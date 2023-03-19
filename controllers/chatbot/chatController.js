const addOrderItems = require("../order/addOrderItems");
const addMessage = require("./addMessage");

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
    return res.json(`You ordered ${meal[0].name}, How many?`);
  }
  return res.json("Sorry the meal dose not exist");
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

    return res.json(
      `you ordered ${quantity} and Your total price is ${
        quantity * lastMsg.payload?.order?.price
      } Do you need anything else?`
    );
  } else {
    return res.json("You must enter a numeric value of quantity");
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

    return res.json("what do you want?");
  } else if (req.params.msg == "no") {
    await addMessage({
      cookie: "test",
      message: `Please enter your address`,
      type: "sent",
      payload: {
        step: "address",
      },
    });
    return res.json("Please enter your address");
  }
}

async function checkAddress(res) {
  await addMessage({
    cookie: "test",
    message: `You Ordered`,
    type: "sent",
    payload: {
      step: "greeting",
    },
  });
  return res.json("Will print the order table with a total price");
}

async function welcomeMsg(res) {
  await addMessage({
    cookie: "test",
    message: "Welcome what do you need to order?",
    type: "sent",
    payload: {
      step: "greeting",
    },
  });
  return res.json("Welcome what do you need to order?");
}

module.exports = {
  checkIfInMenu,
  checkQuantity,
  confirmOrder,
  checkAddress,
  welcomeMsg,
};
