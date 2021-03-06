require("dotenv").config();
const express = require("express");
const app = express();
const { crowler, save } = require("./crowler");
const cron = require("node-cron");

const MainRouter = require("./router/mainRouter");

app.use("/api", MainRouter);
//background job para ativar o crawler todas meia noite
cron.schedule("0 0 * * * ", () => {
  crowler().then(data => save(null, data));
});

app.use(function(req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  res.json({ status: 404, reason: err.message });
  next();
});

app.listen(process.env.PORT || 3000, console.log("app is running"));
