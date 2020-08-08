const Blog = require('../models/blog');
const User = require('../models/user');
const lodash = require('lodash');

const initialBlogs = [
  {
    title: 'How to cook rice',
    author:'BBC',
    url: 'www.bbc.com/article/how-to-cook-rice',
    likes: 17
  },
  {
    title: 'How to cook fried rice',
    author: 'BBC',
    url: 'www.bbc.com/article/cooking-fried-rice',
    likes: 541
  },
  {
    title: 'Cooking from scratch: Curries',
    author: 'Maunika Gowardhan',
    url: 'https://www.bbc.co.uk/food/collections/cooking_from_scratch_curries',
    likes: 1001
  }
];

const initialUsers = [
  {
    username: 'adadehmav',
    name: 'Boya',
    password: 'Heyo'
  },
  {
    username: 'Askell',
    name: 'Uvuvwevwevwe Unyetenyenvwevwe Ugwemubwem Osas',
    password: 'SuperSekritPasswordNoOneWillKnow'
  }
];

const fetchBlogsDatabase = async () => {
  const blogListFromDatabase = await Blog.find({});
  return blogListFromDatabase.map(blog => blog.toJSON());
};

const fetchUsersDatabase = async () => {
  const usersListFromDatabase = await User.find({});
  return usersListFromDatabase.map(user => user.toJSON());
};

const mostBlogs = (blogsArray) => {
  const sortedBlogsArray = lodash.groupBy(blogsArray, 'author');

  const numberOfBlogsForEachAuthor = Object.values(sortedBlogsArray)
    .map(blogsArray => blogsArray.length);

  let indexOfAuthorWithMostBlog = {
    index: 0,
    blogs: numberOfBlogsForEachAuthor[0]
  };
  for( let i = 0; i < numberOfBlogsForEachAuthor.length; i++){
    if(indexOfAuthorWithMostBlog.blogs < numberOfBlogsForEachAuthor[i]){
      indexOfAuthorWithMostBlog.index = i;
      indexOfAuthorWithMostBlog.blogs = numberOfBlogsForEachAuthor[i];
    }
  }
  const arrayOfAuthors = Object.keys(sortedBlogsArray);
  const authorWithMostBlog = {
    author: arrayOfAuthors[indexOfAuthorWithMostBlog.index],
    blogs: indexOfAuthorWithMostBlog.blogs
  };
  return authorWithMostBlog;
};

const mostLikes = (blogsArray) => {
  const sortedBlogsArray = lodash.groupBy(blogsArray, 'author');
  const keysArray = Object.keys(sortedBlogsArray);
  const valueArray = Object.values(sortedBlogsArray);
  const likesArray = valueArray.map(array => {
    let numberOfLikes = array.map(blog => blog.likes)
      .reduce((accumulator, currentValue) => accumulator + currentValue);
    return numberOfLikes;
  });

  let indexOfAuthorWithMostLikes = {
    index: 0,
    likes: likesArray[0]
  };
  for(let i = 0; i < likesArray.length; i++){
    if(indexOfAuthorWithMostLikes.likes < likesArray[i]){
      indexOfAuthorWithMostLikes.index = i;
      indexOfAuthorWithMostLikes.likes = likesArray[i];
    }
  }
  const authorWithMostLikes = {
    author: keysArray[indexOfAuthorWithMostLikes.index],
    likes: indexOfAuthorWithMostLikes.likes
  };
  return authorWithMostLikes;
};

module.exports = {
  initialBlogs,
  initialUsers,
  fetchBlogsDatabase,
  fetchUsersDatabase,
  mostBlogs,
  mostLikes
};