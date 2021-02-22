const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((likes, blog) => likes + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  // don't mutate the original param
  const sorted = [...blogs].sort((a, b) => b.likes - a.likes);
  return sorted[0];
};

const getAuthors = (blogs) => {
  const authors = blogs.map((blog) => blog.author);
  return _.uniq(authors);
};

const blogsByAuthor = (blogs, author) => {
  const filtered = blogs.filter((blog) => blog.author === author);
  return { author, blogs: filtered.length };
};

const mostBlogs = (blogs) => {
  // Yeah, not computationally ideal. I know.
  // Does the job for the scope of this course exercise though...
  const authors = getAuthors(blogs);
  const sorted = authors.sort(
    (a, b) => blogsByAuthor(blogs, b).blogs - blogsByAuthor(blogs, a).blogs
  );
  const author = sorted[0];
  const count = blogsByAuthor(blogs, author).blogs;
  return { author, blogs: count };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  getAuthors,
  blogsByAuthor,
};
