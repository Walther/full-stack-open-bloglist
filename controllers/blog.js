const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }
  return null;
};

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("users");
  response.json(blogs);
});

blogRouter.post("/", async (request, response, next) => {
  const token = getTokenFrom(request);
  if (!token) {
    return response.status(401).json({ error: "token missing" });
  }
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }
  const user = await User.findById(decodedToken.id);

  const blogObject = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes ? request.body.likes : 0, // Default value
    user: user._id,
  };
  const blog = new Blog(blogObject);
  try {
    // Save new blog entry
    const savedBlog = await blog.save();
    // Save to user's blogs too
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    // Return
    response.status(201).json(savedBlog);
  } catch (error) {
    next(error);
  }
});

blogRouter.delete("/:id", async (request, response, next) => {
  try {
    const blogs = await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

blogRouter.put("/:id", async (request, response, next) => {
  const blogObject = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes ? request.body.likes : 0, // Default value
  };
  try {
    const blog = await Blog.findByIdAndUpdate(request.params.id, blogObject, {
      new: true,
    });
    response.status(200).json(blog);
  } catch (error) {
    next(error);
  }
});

module.exports = blogRouter;
