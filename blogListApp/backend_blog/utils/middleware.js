//blogListApp/backend_blog/utils/middleware.js
const logger = require('./logger')
const jwt = require('jsonwebtoken');
const User = require('../models/user');


//############## Custom Middlewares #####################

//------------------------
const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}
//------------------------

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
//------------------------
const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    return response.status(400).json({ error: 'expected `username` to be unique' })
  } else if (error.name ===  'JsonWebTokenError') {
    return response.status(401).json({ error: 'token invalid' })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired'
    })
  }

  next(error)
}

//------------------token extractor-----------
const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.startsWith('Bearer ')) {
    const token = authorization.replace('Bearer ', '');
    request.token = token;
    console.log('Extracted Token:', token);  // Log the token
  } else {
    request.token = null;
    console.log('No token found');  // Log when token is missing
  }
  next();
};

//------------------ user extractor finds out the user based on the token-----------
const userExtractor = async (request, response, next) => {
  const token = request.token;  // Token should be extracted before this point
  if (!token) {
    return response.status(401).json({ error: 'token missing' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' });
    }
    const user = await User.findById(decodedToken.id);
    if (!user) {
      return response.status(401).json({ error: 'user not found' });
    }
    request.user = user; // Attach user to request
    next(); // Move to next middleware/route handler
  } catch (error) {
    console.error('Error during token validation:', error);  // Log the error for debugging
    return response.status(401).json({ error: 'token invalid' });
  }
};



module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}

