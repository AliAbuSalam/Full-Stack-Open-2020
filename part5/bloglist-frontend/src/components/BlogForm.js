import React, { useState } from 'react';
import PropTypes from 'prop-types';

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setURL] = useState('');

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title,
      author,
      url
    });
    setTitle('');
    setAuthor('');
    setURL('');
  };

  return(
    <div className='formDiv'>
      <div><h2>create new</h2></div>
      <form onSubmit={addBlog}>
        <div>title: <input type='text' value={title} onChange={({ target }) => setTitle(target.value)} id='title'/></div>
        <div>author: <input type='text' value={author} onChange={({ target }) => setAuthor(target.value)} id='author'/></div>
        <div>url: <input type='text' value={url} onChange={({ target }) => setURL(target.value)} id='url'/></div>
        <button type='submit'>create</button>
      </form>
    </div>
  );
};

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
};

export default BlogForm;