//controllers/blogs.js
const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

// GET all blogs
blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({});
    response.json(blogs);
  } catch (error) {
    next(error); // Pass the error to the error handler
  }
});

// GET a single blog by ID
blogsRouter.get('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id);
    if (blog) {
      response.json(blog);
    } else {
      response.status(404).end(); // Blog not found
    }
  } catch (error) {
    next(error); // Pass the error to the error handler
  }
});

// POST a new blog
blogsRouter.post('/', async (request, response, next) => {
  const { title, author, url, likes } = request.body;

  if (!title || !url) {
    return response.status(400).json({ error: 'title or url missing' });
  }

  const blog = new Blog({
    title,
    author,
    url,
    likes: likes || 0, // Default likes to 0 if it's missing
  });
  try {
    const savedBlog = await blog.save();
    response.status(201).json(savedBlog);
  } catch (error) {
    next(error);
  }
});

// DELETE a blog by ID
blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const blogId = request.params.id;
    console.log('Trying to delete blog with id:', blogId); // Log blog ID
    
    const result = await Blog.findByIdAndDelete(blogId);
    if (result) {
      response.status(204).end(); // Successfully deleted
    } else {
      response.status(404).end(); // Blog not found
    }
  } catch (error) {
    next(error); // Pass the error to the error handler
  }
});


// --------PUT to update a blog by ID----------
blogsRouter.put('/:id', async (request, response, next) => {
  const { id } = request.params;
  const { likes } = request.body;

  try {
    // Update the likes field of the blog
    const updatedBlog = await Blog.findByIdAndUpdate(id,{ likes },
    { new: true, runValidators: true, context: 'query' });

    if (updatedBlog) {
      response.status(200).json(updatedBlog);
    } else {
      return response.status(404).json({ error: 'Blog not found' });
    }
  } catch (error) {
    next(error); // Pass the error to the error handler
  }
});

module.exports = blogsRouter;
