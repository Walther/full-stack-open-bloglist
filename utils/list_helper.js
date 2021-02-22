const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((likes, blog) => likes + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  // don't mutate the original param
  let sorted = [...blogs].sort((a, b) => b.likes - a.likes);
  return sorted[0];
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
