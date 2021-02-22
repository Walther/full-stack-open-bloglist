const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs");
  response.json(users.map((u) => u.toJSON()));
});

usersRouter.post("/", async (request, response, next) => {
  const body = request.body;

  if (body.username === undefined || body.username.length < 3) {
    response.status(400).json({
      error: "username must exist and be at least 3 characters long",
    });
    return;
  }

  if (body.password === undefined || body.password.length < 3) {
    response.status(400).json({
      error: "password must exist and be at least 3 characters long",
    });
    return;
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  });

  try {
    const result = await user.save();
    response.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
