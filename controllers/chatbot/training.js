const Menu = require("../../models/Menu");
let natural = require("natural");
const {
  checkIfInMenu,
  checkQuantity,
  confirmOrder,
  checkAddress,
  welcomeMsg,
} = require("./chatController");

const addMessage = require("./addMessage");
const { getMessages } = require("./getMessage");
let classifier = new natural.BayesClassifier();

async function training(req, res) {
  const getAllItems = await Menu.find();
  getAllItems.forEach(({ name }) => {
    classifier.addDocument(name, name);
  });

  classifier.addDocument("Hi Hello", "Hi");
  classifier.train();

  await addMessage({
    cookie: "test",
    message: req.params.msg,
    type: "received",
    payload: {},
  });

  let msg = classifier.classify(req.params.msg);
  let allMsgs = await getMessages();
  let lastMsg = allMsgs[allMsgs.length - 1];

  let step = lastMsg?.payload?.step;
  if (msg == "Hi") {
    return await welcomeMsg(res);
  } else if (step == "greeting") {
    return await checkIfInMenu(res, msg, getAllItems);
  } else if (step == "order") {
    await checkQuantity(req.params.msg, res, lastMsg);
  } else if (step == "quantity") {
    await confirmOrder(req, res, lastMsg);
  } else if (step == "address") {
    await checkAddress(res);
  } else {
    res.json("I don't understand what do you want");
  }
}

module.exports = training;
