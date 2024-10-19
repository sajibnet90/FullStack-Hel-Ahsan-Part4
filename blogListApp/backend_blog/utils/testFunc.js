//const { blogCountByAuthor } = require('./list_helper');  // Assuming the function is in list_helper.js

const blogs = [
  { title: "Blog A", author: "Author 1", likes: 2 },
  { title: "Blog B", author: "Author 2", likes: 8 },
  { title: "Blog C", author: "Author 3", likes: 9 },
  { title: "Blog D", author: "Author 1", likes: 14 }
];


// // Counting the number of blogs for each author
// //Should return an obj with authors name and number of blog written { author: 'Author 1', blogs: 2 }

const mostBlogs = (blogs) => {
    // Count the number of blogs for each author
    const blogsCountByAuthor = blogs.reduce((authorBlogCounts, blog) => {
      console.log('Processing blog:', blog);  // Show the current blog being processed
      console.log('Before:', authorBlogCounts);  // Log the current state of the counts object
      
      // Increment the count for the current author, or initialize it to 1 if not present
      authorBlogCounts[blog.author] = (authorBlogCounts[blog.author] || 0) + 1;
      
      console.log(`Author: ${blog.author}, Current blog count:`, authorBlogCounts[blog.author]);
      console.log('After:', authorBlogCounts);  // Log the updated state of the counts object
      console.log('--------------------');
      return authorBlogCounts;
    }, {});
  
    console.log('Final blog count by author:', blogsCountByAuthor);  // Final object after reduce
    console.log('\n');
    
    // Find the author with the most blogs
    //get topAuthor name, Object.keys(blogsCountByAuthor) returns an array of the author names (the keys)
    console.log('converting blogsCountByAuthor obj to array with keys',Object.keys(blogsCountByAuthor))
    const topAuthor = Object.keys(blogsCountByAuthor).reduce((a, b) => {
      console.log(`Comparing ${a} with ${b}`);  // Log comparison between two authors
      console.log('Blog count of', a, ':', blogsCountByAuthor[a]);
      console.log('Blog count of', b, ':', blogsCountByAuthor[b]);
  
      // Return the author with more blogs
      return blogsCountByAuthor[a] > blogsCountByAuthor[b] ? a : b;
    });
  
    console.log('Top author with most blogs:', topAuthor);
  
    return {
      author: topAuthor,
      blogs: blogsCountByAuthor[topAuthor]
    };
  };
  
// Calling the function and logging the result
const result1 = mostBlogs(blogs);
console.log('Top author as object:', result1);


  //###################### most likes by Author ###############
  const mostLikes = (blogs) => {
    // Step 1: Summing the likes for each author
    const likesByAuthor = blogs.reduce((authorLikes, blog, index) => {
      console.log(`\nProcessing blog ${index + 1}:`);
      console.log('Current blog:', blog);
  
      // Display the current state of authorLikes before modification
      console.log('Current authorLikes object:', authorLikes);
  
      // Check if the current author has been processed before or not
      console.log(`Current likes for ${blog.author}:`, authorLikes[blog.author] || 0);
  
      // Update the likes count for the author
      authorLikes[blog.author] = (authorLikes[blog.author] || 0) + blog.likes;
  
      // Log the updated likes for the current author
      console.log(`After adding ${blog.likes} likes, total for ${blog.author}:`, authorLikes[blog.author]);
  
      return authorLikes;
    }, {});
  
    console.log('\nFinal likes count by author:', likesByAuthor);
  
    // Step 2: Finding the author with the most likes
    const topAuthor = Object.keys(likesByAuthor).reduce((a, b) => {
      console.log('\nComparing authors:', a, 'and', b);
      console.log(`Total likes for ${a}:`, likesByAuthor[a]);
      console.log(`Total likes for ${b}:`, likesByAuthor[b]);
  
      const chosen = likesByAuthor[a] > likesByAuthor[b] ? a : b;
      console.log('Author with more likes so far:', chosen);
  
      return chosen;
    });
  
    // Step 3: Returning the result
    console.log('\nAuthor with the most likes:', topAuthor, 'with', likesByAuthor[topAuthor], 'likes');
  
    return {
      author: topAuthor,
      likes: likesByAuthor[topAuthor]
    };
  };
  
  // Calling the function and logging the result
  const result = mostLikes(blogs);
  console.log('\nResult:', result);
  