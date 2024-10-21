//blogListApp/backend_blog/controllers/users.js
const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body;
  
  if (!password || password.length < 3 || !username || username.length < 3) {
    return response.status(400).json({ error: 'username and password must be at least 3 characters long' });
  }
  
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  
  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();
  response.status(201).json(savedUser);
});

// GET all users 
// usersRouter.get('/', async (request, response) => {
//   const users = await User.find({});
//   response.json(users);
// });
// GET all users with their blogs
usersRouter.get('/', async (request, response) => {
  try {
      const users = await User.find({}).populate('blogs', { title: 1, url: 1 }); // Ensure you have set up the relationship in your User model
      response.json(users);
  } catch (error) {
      next(error);
  }
});


// Get user by ID
usersRouter.get('/:id', async (request, response, next) => {
    try{
    const user = await User.findById(request.params.id)
    if (user) {
      response.json(user)
        }
    }catch(error){
    next(error)
    }
  })

  // Delete user by ID
usersRouter.delete('/:id', async (request, response, next) => {
    try{
    const result = await User.findByIdAndDelete(request.params.id)
    if (result) {
      response.status(204).end() // Success, no content
        } 
    } catch(error) {
      next(error)
    }
  })
  

module.exports = usersRouter;
