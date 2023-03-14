const Menu = require("../../models/Menu");

const addMenuItems = async (req, res) => {
  const { name, price } = req.body;

  const menuItems = new Menu({
    name,
    price,
  });
  await menuItems.save();
};

module.exports = addMenuItems;
