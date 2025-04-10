const express = require('express');
const users = require("./users");

const app = express();

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

const port = process.env.port || 3000;
app.listen(port, () => console.log("listening to the port 3000"));