//tests/test_helperDB.js
const Blog = require('../models/blog')
const initialBlogs = [
  {
    title: 'First Blog',
    author: 'Author One',
    url: 'http://example.com/first-blog',
    likes: 5,
  },
  {
    title: 'Second Blog',
    author: 'Author Two',
    url: 'http://example.com/second-blog',
    likes: 10,
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON()) //map returns an Array
}

module.exports = { initialBlogs, blogsInDb  };