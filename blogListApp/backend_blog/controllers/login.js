const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body
// Find a user document from the database by the username (returns null if not found)
const user = await User.findOne({ username })

// Check if the user exists and if the provided password matches the stored password hash
const passwordCorrect = user === null
  ? false  // If user is not found, passwordCorrect is set to false
  : await bcrypt.compare(password, user.passwordHash)  // If user is found, compare the plain-text password with the hashed password

// If the user is not found or the password is incorrect, return a 401 Unauthorized response with an error message
if (!(user && passwordCorrect)) {
  return response.status(401).json({
    error: 'invalid username or password'
  })
}

// Create a payload object for the token with the user's username and ID
const userForToken = {
  username: user.username,   // Include the username
  id: user._id,              // Include the user's unique MongoDB ID (_id)
}

// Generate a signed JWT (JSON Web Token) using the user payload and a secret key
// token expires in 60*60 seconds, that is, in one hour
const token = jwt.sign(
  userForToken, 
  process.env.SECRET,
  { expiresIn: 60*60 }
)

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter;
