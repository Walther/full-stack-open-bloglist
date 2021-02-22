const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

const Blog = require("../models/blog");
const listHelper = require("../utils/list_helper");

const manyBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url:
      "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
  },
  {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url:
      "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
  },
  {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  for (blog of manyBlogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(manyBlogs.length);
});

test("all blogs have an id field", async () => {
  const response = await api.get("/api/blogs");
  for (blog of response.body) {
    expect(blog.id).toBeDefined();
  }
});

test("a blog post can be added", async () => {
  const newPost = {
    title: "Test Post",
    author: "Jest Test",
    url: "https://example.com/",
    likes: 0,
  };
  const blog = await api.post("/api/blogs").send(newPost);
  expect(blog.body.id).toBeDefined();
  const blogs = await api.get("/api/blogs");
  expect(blogs.body).toHaveLength(manyBlogs.length + 1);
});

test("a blog post can be added, without a likes field specified", async () => {
  const newPost = {
    title: "Test Post",
    author: "Jest Test",
    url: "https://example.com/",
  };
  const response = await api.post("/api/blogs").send(newPost);
  expect(response.body.likes).toBe(0);
});

test("a blog post cannot be added without a title field specified", async () => {
  const newPost = {
    author: "Jest Test",
    url: "https://example.com/",
  };
  await api.post("/api/blogs").send(newPost).expect(400);
});

test("a blog post cannot be added without a url field specified", async () => {
  const newPost = {
    title: "Test Post",
    author: "Jest Test",
  };
  await api.post("/api/blogs").send(newPost).expect(400);
});

test("a blog post can be deleted", async () => {
  // add first, so that we get a known id
  // yeah yeah, could be cleaner and more isolated as a test...
  // again, works for the scope of this course exercise.
  const newPost = {
    title: "Test Post",
    author: "Jest Test",
    url: "https://example.com/",
    likes: 0,
  };
  const blog = await api.post("/api/blogs").send(newPost);
  const id = blog.body.id;
  expect(id).toBeDefined();
  const blogs = await api.get("/api/blogs");
  expect(blogs.body).toHaveLength(manyBlogs.length + 1);

  const response = await api.delete(`/api/blogs/${id}`);
  expect(response.status).toBe(204);
});

test("a blog post can be updated", async () => {
  // add first, so that we get a known id
  // yeah yeah, could be cleaner and more isolated as a test...
  // again, works for the scope of this course exercise.
  const newPost = {
    title: "Test Post",
    author: "Jest Test",
    url: "https://example.com/",
    likes: 0,
  };
  const blog = await api.post("/api/blogs").send(newPost);
  const id = blog.body.id;
  expect(id).toBeDefined();

  const updatedPost = {
    title: "Test Post",
    author: "Jest Test",
    url: "https://example.com/",
    likes: 1,
  };

  const response = await api.put(`/api/blogs/${id}`).send(updatedPost);
  expect(response.status).toBe(200);
  expect(response.body.likes).toBe(1);
});

afterAll(() => {
  mongoose.connection.close();
});
