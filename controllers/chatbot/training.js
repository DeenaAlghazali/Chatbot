const Menu = require("../../models/Menu");
var natural = require("natural");
const addOrderItems = require("../order/addOrderItems");

var classifier = new natural.BayesClassifier();
//Wrong Spelling
//wordFromDB = pizza;
const getSimilars = (wordFromDB) => {
  return ["pizzza", "pizzzzzzzzza"];
  //library to provide similars words
};

//
const training = async (req, res) => {
  const getAllItems = await Menu.find();
  let similar = [];
  //name from db
  //name is handled
  getAllItems.forEach(({ name }) => {
    similar.push({ key: name, data: getSimilars(name) });
    //pizza(key): [pizzza, pizzzzzzzzzzzzzza](data)
  });

  //
  let data2Training = [];
  similar.map(({ key, data }) => {
    data.map((word) => {
      // console.log(word, "word");
      data2Training.push({ text: word, label: key });
      //pizzza: pizza 
      //pizzzzzzzzzzzzzza: pizza
    });
  });

  data2Training.forEach((item) => {
    console.log(item.text, item.label);
    classifier.addDocument(item.text, item.label);
  });

  console.log(similar);
  classifier.train();
  console.log(classifier.classify("i am test7"));
  // ! TOCHANGE
  req.body.name = classifier.classify("i am test7");
  req.body.quantity = 1;
  addOrderItems(req, res);
};

module.exports = training;
