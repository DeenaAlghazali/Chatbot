const Menu = require("../models/Menu");

const addMenuItems = async (req, res) => {
  const { name, price } = req.body;
  console.log(name, price);

  const menuItems = new Menu({
    name,
    price,
  });
  await menuItems.save();
  res.json("Success");
};

module.exports = addMenuItems;
