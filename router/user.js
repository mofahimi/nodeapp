const express = require('express');
const users = require("../users");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const User = require("../models/user");


router.get('/', async (req, res) => {
  const users = await User.find();
  if (!users) {
    return res.status(404).send("there is no user");
  }
  res.json(users);
});


router.get("/:id", async (req, res) => {
  const users = await User.findById(req.params.id);
  if (!users) {
    res.status(404).send("there is no user whit this id");
  }
  res.json({
    data: users,
    messege: "ok"
  });
});

router.post("/", [
  body("email", "email is required").isEmail(),
  body("first_name", "first_name is required").notEmpty(),
  body("last_name", "last_name is required").notEmpty(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
      message: "validation error"
    });
  }
  let newUser = new User({
    id: req.body.id,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    avatar: req.body.avatar
  })
  newUser = await newUser.save();
  res.json({
    data: newUser,
    message: "ok"
  })
})

router.put("/:id", [
  body("email", "email is required").isEmail(),
  body("first_name", "first_name is required").notEmpty(),
  body("last_name", "last_name is required").notEmpty(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
      message: "validation error"
    });
  }
  const user = await User.findByIdAndUpdate(req.params.id, {
    id: req.body.id,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    avatar: req.body.avatar
  }, { new: true }
  );
  if (!user) {
    return res.status(404).send("User not found");
  }
  res.json({
    data: user,
    message: "ok"
  })
})

router.delete("/:id", async(req, res) => {
  const user =await User.findByIdAndDelete(req.params.id);
  const users = await User.find();
  if (!user){
    return res.status(404).send("User not found");
  }
  res.json({
    data: users,
    message: "ok"
  })
})

module.exports = router;
