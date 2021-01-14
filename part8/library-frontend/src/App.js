
import React, { useCallback, useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login';
import { INITIALIZE_APP, FETCH_USER_INFO } from './queries';
import { useLazyQuery, useQuery } from '@apollo/client';
import RecommendationPage from './components/RecommendationPage';

const App = () => {
  const [page, setPage] = useState('authors');
  const [allAuthors, setAllAuthors] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('library-app-token'));
  const [userInfo, setUserInfo] = useState(null);
  const fetchData = useQuery(INITIALIZE_APP);
  const [fetchUserInfo] = useLazyQuery(FETCH_USER_INFO, {
    onCompleted: (result) => {
      console.log('result: ', result);
      setUserInfo(result.me);
    },
    onError: (error) => {
      if(error.graphQLErrors.length > 0){
        console.log('error: ', error.graphQLErrors[0].message);
      } else {
        console.log('error: ', error.message);
      }
    }
  });
  const setPageCallback = useCallback(() => setPage('authors'), []);
  const setTokenCallback = useCallback((token) => setToken(token), []);

  
  useEffect(() => {
    if(!fetchData.loading){
      try{
        setAllAuthors(fetchData.data.allAuthors);
        setAllBooks(fetchData.data.allBooks);
      } catch (error){
        console.log(Object.getOwnPropertyNames(error));
        console.log('error: ', error.message);
      }
    }
  },[fetchData, setAllAuthors]);


  useEffect(() => {
    if(token !== null){
      fetchUserInfo()
    }
  }, [token, fetchUserInfo]); 

  const handleLogout = () => {
    setToken(null);
    localStorage.clear();
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button style={{ display: token ? '': 'none' }} onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommend')} style={{ display: token ? '': 'none' }}>recommend</button>
        <button onClick={() => setPage('login')} style={{ display: token ? 'none': ''}}>login</button>
        <button onClick={handleLogout} style={{ display: token ? '' : 'none'}}>logout</button>
      </div>

      <Authors
        show={page === 'authors'}
        allAuthors={allAuthors}
      />

      <Books
        show={page === 'books'}
        allBooks={allBooks}
      />

      <NewBook
        show={page === 'add'}
      />

      <Login 
        show={page === 'login'}
        setToken={setTokenCallback}
        setPage={setPageCallback}
      />

      <RecommendationPage 
        show={page === 'recommend'}
        userInfo={userInfo}
      />

    </div>
  )
}

export default App