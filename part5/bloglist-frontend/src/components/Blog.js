import React, { useState } from 'react';
const Blog = ({ blog, updateBlog, deleteBlog, loggedInUser }) => {
  const [visibility, setVisibility] = useState(false);

  const hideWhenVisible = { display: visibility? 'none': '' };
  const showWhenVisible = { display: visibility? '': 'none' };
  const isMadeByUser = { display: !loggedInUser? 'none': (blog.user !== undefined? (loggedInUser.username === blog.user.username? '': 'none') : 'none') };

  const toggleVisibility = () => {
    setVisibility(!visibility);
  };

  const blogStyle = {
    border: 'solid',
    borderWidth: 1,
    paddingTop: 10,
    paddingLeft: 2,
    marginBottom: 5
  };

  const likesBlog = () => {
    const newBlog = {
      likes: blog.likes+1,
      title: blog.title,
      url: blog.url,
      author: blog.author,
      id: blog.id
    };
    if(blog.user){
      newBlog.user = blog.user.id;
    }
    updateBlog(newBlog);
  };

  const removeBlog = () => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)){
      const blogId = blog.id;
      deleteBlog(blogId);
    }
  };

  return(
    <div style={blogStyle}>
      <div style={hideWhenVisible} className='blogDivNoVisibility'>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible} className='blogDivWithVisibility'>
        {blog.title} <button onClick={toggleVisibility}>hide</button><br/>
        {blog.url} <br/>
        {blog.likes} <button onClick={likesBlog}>like</button> <br/>
        {blog.author} <br/>
        <button onClick={removeBlog} style={isMadeByUser}>remove</button>
      </div>
    </div>
  );

};

export default Blog;
