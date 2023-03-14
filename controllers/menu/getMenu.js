const Menu = require("../../models/Menu");

const getMenu = async (req, res) => {
  const getAllItems = await Menu.find();
  res.status(200).json({ data: getAllItems });
};

module.exports = getMenu;
