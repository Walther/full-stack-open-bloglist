const listHelper = require("../utils/list_helper");

// Helper data

const noBlogs = [];

const listWithOneBlog = [
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
];

const manyBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url:
      "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url:
      "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
];

const exampleAuthor = "Edsger W. Dijkstra";
const exampleAuthor2 = "Robert C. Martin";

// Tests

describe("dummy", () => {
  test("dummy returns one", () => {
    const result = listHelper.dummy(noBlogs);
    expect(result).toBe(1);
  });
});

describe("total likes", () => {
  test("when list has no blogs, equals zero", () => {
    const result = listHelper.totalLikes(noBlogs);
    expect(result).toBe(0);
  });

  test("when list has only one blog equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });

  test("when list has many blogs, equals the sum of likes", () => {
    const result = listHelper.totalLikes(manyBlogs);
    expect(result).toBe(36);
  });
});

describe("favorite blog", () => {
  test("when list has no blogs, undefined", () => {
    const result = listHelper.favoriteBlog(noBlogs);
    expect(result).toEqual(undefined);
  });

  test("when list has only one blog, returns it", () => {
    const result = listHelper.favoriteBlog(listWithOneBlog);
    expect(result).toEqual(listWithOneBlog[0]);
  });

  test("when list has many blogs, returns the one with most likes", () => {
    let expected = manyBlogs[2];
    const result = listHelper.favoriteBlog(manyBlogs);
    expect(result).toEqual(expected);
  });
});

describe("getAuthors", () => {
  test("when list has no blogs, empty array", () => {
    const result = listHelper.getAuthors(noBlogs);
    expect(result).toEqual([]);
  });

  test("when list has only one blog, returns it", () => {
    const result = listHelper.getAuthors(listWithOneBlog);
    expect(result).toEqual([listWithOneBlog[0].author]);
  });

  test("when list has many blogs, returns all authors", () => {
    let expected = ["Michael Chan", "Edsger W. Dijkstra", "Robert C. Martin"];
    const result = listHelper.getAuthors(manyBlogs);
    expect(result).toEqual(expected);
  });
});

describe("blogsByAuthor", () => {
  test("when list has no blogs by the author, author and zero", () => {
    const result = listHelper.blogsByAuthor(noBlogs, exampleAuthor);
    const expected = { author: exampleAuthor, blogs: 0 };
    expect(result).toEqual(expected);
  });

  test("when list has only one blog by the author, returns one", () => {
    const result = listHelper.blogsByAuthor(listWithOneBlog, exampleAuthor);
    const expected = { author: exampleAuthor, blogs: 1 };
    expect(result).toEqual(expected);
  });

  test("when list has many blogs, returns all authors", () => {
    const result = listHelper.blogsByAuthor(manyBlogs, exampleAuthor);
    const expected = { author: exampleAuthor, blogs: 2 };
    expect(result).toEqual(expected);
  });
});

describe("mostBlogs", () => {
  test("when list has no blogs, undefined and zero", () => {
    const result = listHelper.mostBlogs(noBlogs);
    const expected = { author: undefined, blogs: 0 };
    expect(result).toEqual(expected);
  });

  test("when list has only one blog by the author, returns that author and one", () => {
    const result = listHelper.mostBlogs(listWithOneBlog);
    const expected = { author: exampleAuthor, blogs: 1 };
    expect(result).toEqual(expected);
  });

  test("when list has many blogs, returns expected author and count", () => {
    const result = listHelper.mostBlogs(manyBlogs);
    const expected = { author: exampleAuthor2, blogs: 3 };
    expect(result).toEqual(expected);
  });
});
