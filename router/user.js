const express = require('express');
const users = require("../users");
const { body, validationResult } = require("express-validator");
const router = express.Router();


router.get('/', (req, res) => {
  res.json(users);
});


router.get("/:id", (req, res) => {
  const finduser = users.find(user => { return user.id === parseInt(req.params.id); });
  if (!finduser) {
    res.status(404).send("there is no user whit this id");
  }
  res.json({
    data: finduser,
    messege: "ok"
  });
});

router.post("/", [
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

router.put("/:id", [
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
  const index = users.findIndex( user => user.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).send("User not found");
  }
  users[index] = { ...users[index], ...req.body };

  res.json({
    data: users,
    message: "ok"
  })
})

router.delete("/:id", (req, res) => {
  const index = users.findIndex( user => user.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).send("User not found");
  }
  users.splice(index, 1);
  res.json({
    data: users,
    message: "ok"
  })
})

module.exports = router;
