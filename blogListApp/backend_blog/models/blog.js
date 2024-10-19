const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
  })
// removing _id and __v from mongo database when retriving data
blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString(); // Set id to the string version of _id
    delete returnedObject._id; // Remove the original _id
    delete returnedObject.__v; // Optionally remove __v
  }
});
  
  module.exports = mongoose.model('Blog', blogSchema)