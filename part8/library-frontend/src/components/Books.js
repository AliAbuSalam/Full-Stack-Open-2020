import React, { useState } from 'react';
import FilterButton from './FilterButton';
import { useQuery, useLazyQuery, useApolloClient, useSubscription } from '@apollo/client';
import { FETCH_ALL_BOOKS, FETCH_BOOKS_BY_GENRE, FETCH_BOOKS, BOOK_ADDED } from '../queries';
import { useArrayExtract } from '../hooks/useArrayExtract';

const Books = (props) => {
  const [books, setBooks] = useState([]);
  const [stateOfPage, setStateOfPage] = useState('');
  const [listOfFilter, addBooksToCheckMoreFilter] = useArrayExtract([]);
  const client = useApolloClient();
  useQuery(FETCH_ALL_BOOKS, {
    onCompleted: (result) => {
      setBooks(result.allBooks);
      addBooksToCheckMoreFilter(result.allBooks);
      setStateOfPage('nofilter');
    },
    onError: (error) => {
      console.log('cannot fetch books: ', error.graphQlError[0].message);
    }
  });
  const [fetchFilteredBooks, filteredBooks ] = useLazyQuery(FETCH_BOOKS_BY_GENRE, {
    onCompleted: () => {
      setBooks(filteredBooks.data.allBooks);
      addBooksToCheckMoreFilter(filteredBooks.data.allBooks);
    },
    onError: (error) => {
      if(error.graphQLErrors.length > 0){
        console.log('error: ', error.graphQLErrors[0].message);
      } else {
        console.log('error: ', error.message);
      }
    },
    fetchPolicy: "cache-first"
  });

  const updateAllBookCache = (newBook) => {
    console.log('newbook: ', newBook);
    console.log('reading from cache');
    const dataFromCache = client.readQuery({ query: FETCH_BOOKS });
    const dataToWrite = {
      ...dataFromCache,
      allBooks: dataFromCache.allBooks.concat(newBook)
    }
    console.log("write to cache");
    client.writeQuery({
      query: FETCH_BOOKS,
      data: dataToWrite
    });
    return dataToWrite;
  };

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: async ({ subscriptionData }) => {
      console.log('subscription hook');
      const newCache = await updateAllBookCache(subscriptionData.data.bookAdded);
      if(stateOfPage === 'nofilter')
      setBooks(newCache.allBooks);
    }
  });

  const handleFilter = (genre) => {
    fetchFilteredBooks({ variables: {
      genre
    }});
    genre === null ? setStateOfPage('nofilter') : setStateOfPage(genre);
    console.log('state of page: ', stateOfPage);
  };

  if (!props.show) {
    return null
  }
  
  

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <FilterButton filterList={listOfFilter} changeFilter={handleFilter}/>
      <button onClick={() => handleFilter(null)}>all genres</button>
    </div>
  )
}

export default Books