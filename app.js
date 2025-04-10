const express = require('express');
const users = require("./users");
const { body, validationResult } = require("express-validator");

const app = express();

app.use(express.json());

app.get('/api/users', (req, res) => {
  res.json(users);
});


app.get("/api/users/:id", (req, res) => {
  const finduser = users.find((user) => { return user.id === parseInt(req.params.id); });
  if (!finduser) {
    return res.status(404).send("User not found");
  }
  res.json({
    data: finduser,
    messege: "ok"
  });
});

app.post("/api/users", [
  body("email", "email is required").isEmail(),
  body("first_name", "first_name is required").notEmpty(),
  body("last_name", "last_name is required").notEmpty(),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
      message: "validation error"
    });
  }
  users.push({
    id: users.length + 7, ...req.body
  });
  res.json({
    data: users,
    message: "ok"
  })
})

app.put("/api/users/:id", [
  body("email", "email is required").isEmail(),
  body("first_name", "first_name is required").notEmpty(),
  body("last_name", "last_name is required").notEmpty(),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
      message: "validation error"
    });
  }
  const index = users.findIndex((user) => { return user.id === parseInt(req.params.id); });
  if (index === -1) {
    return res.status(404).send("User not found");
  }
  users[index] = { ...users[index], ...req.body };

  res.json({
    data: users,
    message: "ok"
  })
})

app.delete ("/api/users/:id", (req, res)=> {
  const index = users.findIndex((user) => { return user.id === parseInt(req.params.id); });
  if (index === -1) {
    return res.status(404).send("User not found");
  }
  users.splice(index, 1);
  res.json({
    data: users,
    message: "ok"
  })
})



const port = process.env.port || 3000;
app.listen(port, () => console.log("listening to the port 3000"));