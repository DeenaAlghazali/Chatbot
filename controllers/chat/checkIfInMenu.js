const Fuse = require("fuse.js");
const { addMessage } = require("../messages");

const checkIfInMenu = async (req, res, msg, meals) => {
  var mealsName = [];

  meals.forEach(({ name }) => {
    mealsName.push(name);
  });

  const fuse = new Fuse(mealsName, {
    includeScore: true,
    threshold: 0.6,
  });

  const result = fuse.search(msg);
  if (result.length > 0) {
    let meal = await meals.filter((meal) => meal.name == result[0]?.item);
    if (meal) {
      await addMessage({
        cookie: req.cookies["message"],
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
  }
  return res.json({
    data: [{ message: "Sorry the meal dose not exist" }],
  });
};

module.exports = checkIfInMenu;
