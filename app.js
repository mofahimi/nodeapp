const express = require('express');
const helmet = require("helmet");
const config = require("config");
const userRouter = require("./router/user");


const app = express();
// console.log (config.get('time'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());


app.use("/api/users", userRouter )
const port = process.env.port || 3000;
app.listen(port, () => console.log("listening to the port 3000"));