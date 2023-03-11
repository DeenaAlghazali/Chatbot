const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  quantity: {
    type: Number,
    required: true,
    default: 0,
  },
  menu_id: {
    type: String,
    ref: "Menu",
    required: true,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
