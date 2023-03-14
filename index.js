require("dotenv").config();
const app = require("./app");

const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

mongoose.connection.on("error", (err) =>
  console.log("mongoose Connection ERROR: " + err.message)
);
mongoose.connection.once("open", () => {
  console.log("MongoDB Connected!");
});


app.listen(8000, () => {
  console.log("SERVER IS RUNNING ON http://localhost:8000");
});
