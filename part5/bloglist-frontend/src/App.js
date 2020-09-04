import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import BlogForm from './components/BlogForm';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(JSON.parse(window.localStorage.getItem('loggedInUser')));
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs = blogs.sort((blog1, blog2) => {
        return blog2.likes - blog1.likes;
      });
      setBlogs( blogs );
    });
  }, []);

  useEffect(() => {
    const loggedInUser = JSON.parse(window.localStorage.getItem('loggedInUser'));
    if(loggedInUser){
      blogService.setToken(loggedInUser.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await loginService.login({ username, password });
      setUser(userCredential);
      window.localStorage.setItem('loggedInUser', JSON.stringify(userCredential));
      console.log('login success: ', username);
      setUsername('');
      setPassword('');
    } catch (exception){
      console.log('Login Failed: ', exception);
      setErrorMessage('Wrong username or password');
      clearErrorMessage();
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.clear();
    setUser(null);
  };

  const addBlog = async (blogToSubmit) => {
    try {
      const result = await blogService.postBlog(blogToSubmit);
      const newArrayOfBlogs = blogs.concat(result).sort((blog1, blog2) => blog2.likes - blog1.likes);
      setBlogs(newArrayOfBlogs);
      setMessage(`a new blog ${result.title} by ${result.author} added`);
      clearMessage();
    } catch (exception) {
      console.log('posting blog failed: ', exception.error);
      setErrorMessage('posting blog failed, check console for the detailed information');
      clearErrorMessage();
    }
  };

  const putBlog = async (blogToPut) => {
    try {
      const result = await blogService.putBlog(blogToPut);
      console.log('result: ', result);
      const updatedBlogs = blogs.map(blog => {
        if(blog.id === result.id){
          return { ...result };
        }
        return blog;
      });
      setBlogs(updatedBlogs);
    } catch (exception) {
      console.log('updating blog failed: ', exception.error);
      setErrorMessage('updating blog failed, check console for the detailed information');
      clearErrorMessage();
    }
  };

  const deleteBlog = async (idToDelete) => {
    try {
      const result = await blogService.deleteBlog(idToDelete);
      console.log(result);
      const updatedBlogs = blogs.filter(blog => blog.id !== idToDelete);
      setBlogs(updatedBlogs);
    } catch (exception) {
      console.log('deleting blog failed: ', exception.response.data.error);
      setErrorMessage('deleting blog failed, check console for the detailed information');
      clearErrorMessage();
    }
  };

  const clearMessage = () => {
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  const clearErrorMessage = () => {
    setTimeout(() => {
      setErrorMessage(null);
    }, 3000);
  };

  const blogForm = (
    <Togglable buttonLabel='new note'>
      <BlogForm
        createBlog={addBlog}
      />
    </Togglable>
  );

  if(user === null){
    return (
      <div>
        <h2>log in to application</h2>
        <Notification message={message} type='success'/>
        <Notification message={errorMessage} type='error'/>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id='username'
              type='text'
              value={username}
              onChange={({ target }) => { setUsername(target.value);}}
            />
          </div>
          <div>
            password
            <input
              id='password'
              type='text'
              value={password}
              onChange={({ target }) => { setPassword(target.value);}}
            />
          </div>
          <button type='submit'>login</button>
        </form>
      </div>
    );
  } else {
    return (
      <div>
        <h2>blogs</h2>
        <Notification id='successNotification' message={message} type='success'/>
        <Notification id='errorNotification' message={errorMessage} type='error'/>
        <p>{user.name} logged in <button type='submit' onClick={handleLogout}>logout</button></p>
        {blogForm}
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} updateBlog={putBlog} deleteBlog={deleteBlog} loggedInUser={user}/>
        )}
      </div>
    );
  }
};

export default App;