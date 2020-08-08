const dummy = (blogsArray) => {
  blogsArray = 1;
  return blogsArray;
};

const totalLikes = (blogsArray) => {
  const total = blogsArray.map((blog) => blog.likes)
    .reduce((sumOfLikes, numberOfLikes) => {
      return sumOfLikes + numberOfLikes;
    }, 0);

  return total;
};

const favoriteBlog = (blogsArray) => {
  if(blogsArray.length === 0){
    return undefined;
  }
  const comparator = (firstBlog, secondBlog) => {
    if(firstBlog.likes > secondBlog.likes){
      return firstBlog;
    }
    return secondBlog;
  };
  const blogWithHighestLikes = blogsArray.reduce(comparator);
  const favoriteBlog = {
    title: blogWithHighestLikes.title,
    author: blogWithHighestLikes.author,
    likes: blogWithHighestLikes.likes
  };
  return favoriteBlog;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
};
