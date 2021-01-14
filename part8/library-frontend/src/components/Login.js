import React, { useState, useEffect } from 'react';
import { LOGIN } from '../queries';
import { useMutation } from '@apollo/client';

const Login = ({ show, setToken, setPage }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.log('error: ', error.graphQLErrors[0].message);
    }
  });

  useEffect(() => {
    if(result.data){
      try{
        setToken(result.data.login.value);
        localStorage.setItem('library-app-token', result.data.login.value);
        setPage('authors');
      } catch (error){
        console.log('error: ', error);
      }
    }
  }, [setToken, setPage, result.data]);

  const handleLogin = (event) => {
    event.preventDefault();
    setUsername('');
    setPassword('');
    login({ variables: {
      username,
      password
    }});
  };

  if(!show){
    return null
  }

  return(
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          name: <input value={username} onChange={({ target }) => setUsername(target.value)}/>
        </div>
        <div>
          password: <input value={password} onChange={({ target }) => setPassword(target.value)}/>
        </div>
        <button type='submit'>login</button>
      </form> 
    </div>
  );
};

export default Login;