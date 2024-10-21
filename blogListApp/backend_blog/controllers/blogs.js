//controllers/blogs.js
const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')

// GET all blogs
blogsRouter.get('/', async (request, response, next) => {
  try {
      const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 }); // Populate user information
      response.json(blogs);
  } catch (error) {
      next(error);
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

// -------------------POST a new blog-------------------------

blogsRouter.post('/', middleware.userExtractor,async (request, response, next) => {
  const { title, author, url, likes } = request.body;
  try {
   // The user is extracted from the token and available in request.user
   const user = request.user;
    // Create and save the new blog
    const blog = new Blog({
      title,
      author,
      url,
      likes: likes || 0,
      user: user.id, // Set the user who created the blog
    });
    const savedBlog = await blog.save();
   
      // Add the blog's ID to the user's blogs array
      user.blogs = user.blogs.concat(savedBlog._id);
      await user.save();
      response.status(201).json(savedBlog);
  } catch (error) {
    next(error);
  }
});

// ----------------------DELETE a blog by ID-----------------
blogsRouter.delete('/:id', middleware.userExtractor, async (request, response, next) => {

  try {
    const user = request.user;  // The user is extracted from the token and available in request.user
    // Use findByIdAndDelete to remove the blog directly
    const blog = await Blog.findByIdAndDelete(request.params.id);
    if (!blog) {
        return response.status(404).json({ error: 'blog not found' });
    }

    // Check if the user who made the request is the same as the one who created the blog
    if (blog.user.toString() !== user.id.toString()) {
        return response.status(403).json({ error: 'only the creator can delete this blog' });
    }

    // If the blog was deleted successfully, also update the user's blogs array
    user.blogs = user.blogs.filter(blogId => blogId.toString() !== request.params.id);
    await user.save();
    response.status(204).end(); // Successfully deleted, no content to return
} catch (error) {
    next(error);
}
});



module.exports = blogsRouter;


// // --------PUT to update a blog by ID----------
// blogsRouter.put('/:id', async (request, response, next) => {
//   const { id } = request.params;
//   const { likes } = request.body;

//   try {
//     // Update the likes field of the blog
//     const updatedBlog = await Blog.findByIdAndUpdate(id,{ likes },
//     { new: true, runValidators: true, context: 'query' });

//     if (updatedBlog) {
//       response.status(200).json(updatedBlog);
//     } else {
//       return response.status(404).json({ error: 'Blog not found' });
//     }
//   } catch (error) {
//     next(error); // Pass the error to the error handler
//   }
// });