//blogListApp/backend_blog/tests/blog_api.test.js
const { test, describe, beforeEach, after } = require('node:test');
const assert = require('assert'); // Use assert instead of expect
const mongoose = require('mongoose');
const Blog = require('../models/blog');
const User = require('../models/user');

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');  
const helper = require('./test_helperDB');
const supertest = require('supertest');

const app = require('../app');
const api = supertest(app);

const generateToken = async () => {
    const user = await User.findOne({ username: 'testuser' });
    if (!user) {
      throw new Error('Test user not found');
    }
    const userForToken = {
      username: user.username,
      id: user._id,
    };
    return jwt.sign(userForToken, process.env.SECRET);
};


describe('when there are some blogs initially', () => {
    beforeEach(async () => {
        await Blog.deleteMany({});
        await User.deleteMany({});
        const passwordHash = await bcrypt.hash('testpassword', 10);
        const user = new User({ username: 'testuser', passwordHash });
        await user.save();
    
        await Blog.insertMany(helper.initialBlogs);
    });
  //-----------test cases ----------------------

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('correct number of blogs are returned', async () => {
    const response = await api.get('/api/blogs');
    console.log(response.body);
    // Use assert to compare lengths
    assert.strictEqual(response.body.length, helper.initialBlogs.length);
  });


test('blog has id property', async () => {
    const blogs = await helper.blogsInDb();
    console.log('Blogs from DB:', blogs); // Log blogs to verify
    const blog = blogs[0]; 
    // Log the blog's ID to compare
    console.log('Blog ID to fetch:', blog.id);
    // Fetch the blog by its ID
    const response = await api
      .get(`/api/blogs/${blog.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    console.log('Response from GET /api/blogs/:id:', response.body);
    
    // Compare the fetched blog with the original blog from the database
    assert.deepStrictEqual(response.body, blog);
  })

// Test for creating a new blog post
test('a valid blog can be added', async () => {
    const token = await generateToken(); // Get a valid token
  
    const newBlog = {
      title: 'Third Blog',
      author: 'Author Three',
      url: 'http://example.com/third-blog',
      likes: 7,
    };
  
    const blogsAtStart = await helper.blogsInDb();
  
    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`) // Include the token in the header
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);
  
    const blogsAtEnd = await helper.blogsInDb();
    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length + 1);
  
    const savedBlog = await Blog.findById(response.body.id);
    assert.deepStrictEqual(savedBlog.toJSON(), { ...newBlog, id: savedBlog.id, user: savedBlog.user }); // Include user field
  });
  
test('if likes property is missing, it defaults to 0', async () => {
    const token = await generateToken(); // Get a valid token
  
    const newBlog = {
      title: 'Fourth Blog',
      author: 'Author Four',
      url: 'http://example.com/fourth-blog',
    };
  
    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`) // Include the token in the header
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);
  
    const savedBlog = await Blog.findById(response.body.id);
    assert.strictEqual(savedBlog.likes, 0);
    assert.strictEqual(savedBlog.user.toString(), response.body.user); // Ensure user field matches
  });
  
test('blog without title is not added', async () => {
    const token = await generateToken(); // Get a valid token
  
    const newBlog = {
      author: 'Author Five',
      url: 'http://example.com/fifth-blog',
      likes: 5,
    };
  
    const blogsAtStart = await helper.blogsInDb();
  
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`) // Include the token in the header
      .send(newBlog)
      .expect(400); // Bad Request
  
    const blogsAtEnd = await helper.blogsInDb();
    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length);
  });
  
test('blog without url is not added', async () => {
    const token = await generateToken(); // Get a valid token
  
    const newBlog = {
      title: 'Fifth Blog',
      author: 'Author Five',
      likes: 2,
    };
  
    const blogsAtStart = await helper.blogsInDb();
  
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`) // Include the token in the header
      .send(newBlog)
      .expect(400); // Bad Request
  
    const blogsAtEnd = await helper.blogsInDb();
    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length);
  });

  //-----delete a blog------
  // command to test 'only' tests : ╰─❯ npm test -- --test-only 
  test.only('a blog can be deleted', async () => {
    const token = await generateToken(); // Get a valid token

    const newBlog = {
        title: 'Blog to delete',
        author: 'Author Test',
        url: 'http://example.com/delete-blog',
        likes: 5,
    };

    const blogResponse = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201);

    const blogToDelete = blogResponse.body; // Get the blog ID

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`) // Include the token in the header
      .expect(204); // No Content

    const deletedBlog = await Blog.findById(blogToDelete.id);
    assert.strictEqual(deletedBlog, null); // 
});

   //-----update blog likes
  test.only('a blog can have its likes updated', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];
  
    const updatedLikes = { likes: blogToUpdate.likes + 1 };
  
    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedLikes)
      .expect(200) // OK response code
      .expect('Content-Type', /application\/json/);
  
    // Check that the likes field was updated
    assert.strictEqual(response.body.likes, blogToUpdate.likes + 1);
  });
})

  after(async () => {
    // Close the MongoDB connection after all tests
    await mongoose.connection.close();
  });



  //   test('blog has id property', async () => {
//     const blogs = await helper.blogsInDb();
//     console.log(blogs)
//     const blog = blogs[0];
//     const blogById = await api
//         .get(`/api/blogs/${blog.id}`)
//         .expect(200)
//         .expect('Content-Type', /application\/json/)
//         assert.deepStrictEqual(blogById.body, blog)
//   });
