const router = require("express").Router();
const {
  addMenuItems,
  getMenu,
  addOrderItems,
  getOrder,
  training,
} = require("../controllers");

router.get("/", training);
router.route("/menu").post(addMenuItems).get(getMenu);
router.route("/order").post(addOrderItems).get(getOrder);

module.exports = router;
