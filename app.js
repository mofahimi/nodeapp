const express = require('express');
const helmet = require("helmet");
const config = require("config");
const userRouter = require("./router/user");
const mongoose = require("mongoose");


const app = express();
// console.log (config.get('time'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

mongoose
  .connect("mongodb://127.0.0.1:27017/vidly")
  .then(() => console.log("connected to mongodb..."))
  .catch((err) => console.error("could not connect to mongodb..."));


app.use("/api/users", userRouter )
const port = process.env.port || 3000;
app.listen(port, () => console.log("listening to the port 3000"));