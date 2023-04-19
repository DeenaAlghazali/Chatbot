const express = require("express");
const cookieParser = require("cookie-parser");
const router = require("./routes/router");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(router);

module.exports = app;
