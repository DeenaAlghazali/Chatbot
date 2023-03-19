const router = require("express").Router();
const {
  addMenuItems,
  getMenu,
  addOrderItems,
  getOrder,
  training,
  getAllMessages,
} = require("../controllers");

router.get("/favicon.ico", (req, res) => {
  return res.json("test");
});
router.get("/getAllMessages", getAllMessages);
router.route("/menu").post(addMenuItems).get(getMenu);
router.route("/order").post(addOrderItems).get(getOrder);
router.get("/:msg", training);

module.exports = router;
