const express = require("express");
const router = require("express").Router();
const {
  addMenuItems,
  getMenu,
  addOrderItems,
  getOrder,
} = require("./controllers");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

router.route("/menu").post(addMenuItems).get(getMenu);
router.route("/order").post(addOrderItems).get(getOrder);

module.exports = app;
