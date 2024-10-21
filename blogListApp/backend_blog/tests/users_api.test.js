// //blogListApp/backend_blog/tests/users_api.test.js

// const { test, after, beforeEach, describe } = require('node:test')
// const assert = require('node:assert')
// const supertest = require('supertest')
// const bcrypt = require('bcrypt')
// const app = require('../app')
// const User = require('../models/user')

// const mongoose = require('mongoose')
// const helper = require('./test_helperDB');
// const api = supertest(app)

// test('User creation: succeed with valid data', async () => {
//   const newUser = {
//     username: 'newUser',
//     name: 'New User',
//     password: 'mypassword',
//   };

//   const response = await api
//     .post('/api/users')
//     .send(newUser)
//     .expect(201)
//     .expect('Content-Type', /application\/json/);

//   const usersAtEnd = await helper.usersInDb();
//   assert.strictEqual(usersAtEnd.length, 2, 'Two users should exist (initial + new)');
//   const usernames = usersAtEnd.map(u => u.username);
//   assert.ok(usernames.includes(newUser.username), 'New username should be present in the database');
// });

// //----------
// test('User creation: fail if username is less than 3 characters', async () => {
//   const newUser = {
//     username: 'ab',
//     name: 'Short Username',
//     password: 'validpassword',
//   };

//   const response = await api
//     .post('/api/users')
//     .send(newUser)
//     .expect(400)
//     .expect('Content-Type', /application\/json/);

//   assert.ok(response.body.error.includes('username and password must be at least 3 characters long'), 'Error message should mention invalid username/password length');
//   const usersAtEnd = await helper.usersInDb();
//   assert.strictEqual(usersAtEnd.length, 1, 'No new users should be added');
// });
// //---------
// test('User creation: fail if password is less than 3 characters', async () => {
//   const newUser = {
//     username: 'validuser',
//     name: 'Valid User',
//     password: '12',
//   };

//   const response = await api
//     .post('/api/users')
//     .send(newUser)
//     .expect(400)
//     .expect('Content-Type', /application\/json/);

//   assert.ok(response.body.error.includes('username and password must be at least 3 characters long'));
//   const usersAtEnd = await helper.usersInDb();
//   assert.strictEqual(usersAtEnd.length, 1, 'No new users should be added');
// });
// //-------------

// // test('User creation: fail if username is not unique', async (t) => {
// //     const usersAtStart = await helper.usersInDb();
// //     console.log("Current users in DB:", usersAtStart); // Log current users
  
// //     const existingUser = usersAtStart[0].username; // Get the existing username from the database
  
// //     const newUser = {
// //       username: existingUser, // Attempt to create a user with the existing username
// //       name: 'Duplicate Username',
// //       password: 'validpassword',
// //     };
  
// //     // Attempt to create the user
// //     const response = await api
// //       .post('/api/users')
// //       .send(newUser)
// //       .expect(400)
// //       .expect('Content-Type', /application\/json/);
  
// //     // Assert that the error message indicates the username must be unique
// //     assert.ok(response.body.error.includes('expected `username` to be unique'), 'Error message should mention non-unique username');
  
// //     const usersAtEnd = await helper.usersInDb(); // Fetch users at the end of the test
// //     assert.strictEqual(usersAtEnd.length, usersAtStart.length, 'No new users should be added');
// //   });
  
  
// // Before each test, reset the database
// test.beforeEach(async () => {
//     await User.deleteMany({});
//     console.log("Database cleared");
  
//     const passwordHash = await bcrypt.hash('validpassword', 10);
//     const user = new User({
//       username: `validUser-${Date.now()}`, // Ensure this username is unique for the test
//       name: 'Valid User',
//       passwordHash,
//     });
//     await user.save(); // Save the initial user
//     console.log("Initial user created");
//   });
  

// //----closeing the Database after all tests
// after(async () => {
//     await mongoose.connection.close()
//   })