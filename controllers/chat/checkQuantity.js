const { addMessage } = require("../messages");

const checkQuantity = async (req, msg, res, lastMsg) => {
  let quantity = msg.match(/(\d+)/) ? parseInt(msg.match(/(\d+)/)[0]) : "";
  if (typeof quantity == "number") {
    await addMessage({
      cookie: req.cookies["message"],
      message: `you ordered ${quantity} and Your total price is ${
        quantity * lastMsg.payload?.order?.price
      } Do you need anything else?`,
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
};

module.exports = checkQuantity;
