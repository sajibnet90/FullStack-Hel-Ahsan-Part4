// const { test, describe } = require('node:test')
// const assert = require('node:assert')
// const listHelper = require('../utils/list_helper')

// test('dummy returns one', () => {
//   const blogs = []
//   const result = listHelper.dummy(blogs)
//   assert.strictEqual(result, 1)
// })
// //---------------------------------------------------------------------
// describe('total likes', () => {

//   const listWithOneBlog = [
//     {
//       _id: '5a422aa71b54a676234d17f8',
//       title: 'Go To Statement Considered Harmful',
//       author: 'Edsger W. Dijkstra',
//       url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
//       likes: 5,
//       __v: 0
//     }
//   ]

//   const listWithManyBlog = [
//     {
//       _id: "5a422a851b54a676234d17f7",
//       title: "React patterns",
//       author: "Michael Chan",
//       url: "https://reactpatterns.com/",
//       likes: 7,
//       __v: 0
//     },
//     {
//       _id: "5a422b3a1b54a676234d17f9",
//       title: "Canonical string reduction",
//       author: "Edsger W. Dijkstra",
//       url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
//       likes: 12,
//       __v: 0
//     },
//     {
//       _id: "5a422b891b54a676234d17fa",
//       title: "First class tests",
//       author: "Robert C. Martin",
//       url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
//       likes: 10,
//       __v: 0
//     }
//   ]

//   test('when list has only one blog, equals the likes of that', () => {
//     const result = listHelper.totalLikes(listWithOneBlog)
//     assert.strictEqual(result, 5);
//   });
  

//   test('when list has many blogs, equals the total number of likes', () => {
//     const result = listHelper.totalLikes(listWithManyBlog)
//     assert.strictEqual(result, 29);
//   });
// })

// //----------------------------favourite blog-----------------------------------------
  
// describe('favorite blog', () => {
//     const blogs = [
//       { title: "Blog A", author: "Author 1", likes: 2 },
//       { title: "Blog B", author: "Author 2", likes: 8 },
//       { title: "Blog C", author: "Author 3", likes: 4 },
//       { title: "Blog D", author: "Author 1", likes: 4 }
//     ];
  
//     test('finds the blog with most likes', () => {
//       const result = listHelper.favoriteBlog(blogs);
//       assert.deepStrictEqual(result, blogs[1]);
//     });
// })

// //---------------------mostBlogs by authors---------------------------
// describe('most blogs', () => {
//     const blogs = [
//         { title: "Blog A", author: "Author 1", likes: 2 },
//         { title: "Blog B", author: "Author 2", likes: 8 },
//         { title: "Blog C", author: "Author 3", likes: 4 },
//         { title: "Blog D", author: "Author 1", likes: 4 },
//         { title: "Blog E", author: "Author 2", likes: 5 }
//     ];

//     test('finds the author with the most blogs', () => {
//         const result = listHelper.mostBlogs(blogs);
//         assert.deepStrictEqual(result, { author: "Author 2", blogs: 2 });
//     });

// });

// //---------------------mostLikes by author---------------------------
// describe('most likes', () => {
//     const blogs = [
//         { title: "Blog A", author: "Author 1", likes: 2 },
//         { title: "Blog B", author: "Author 2", likes: 8 },
//         { title: "Blog C", author: "Author 3", likes: 4 },
//         { title: "Blog D", author: "Author 1", likes: 4 },
//         { title: "Blog E", author: "Author 2", likes: 5 }
//     ];

//     test('finds the author with the most likes', () => {
//         const result = listHelper.mostLikes(blogs);
//         assert.deepStrictEqual(result, { author: "Author 2", likes: 13 });
//     });

//     test('finds the author when there is only one blog', () => {
//         const singleBlogList = [
//             { title: "Blog A", author: "Author 1", likes: 7 }
//         ];
//         const result = listHelper.mostLikes(singleBlogList);
//         assert.deepStrictEqual(result, { author: "Author 1", likes: 7 });
//     });

// });
