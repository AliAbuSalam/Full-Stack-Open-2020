import React, { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { FETCH_BOOKS_BY_GENRE } from '../queries';

const RecommendationPage = ({ show, userInfo }) => {
  const [fetchRecommendedBooks, recommendedBooks ] = useLazyQuery(FETCH_BOOKS_BY_GENRE, {
    onError: (error) => {
      console.log('error: ', error);
    }
  });

  useEffect(() => {
    if(userInfo){
      fetchRecommendedBooks({ variables: { genre: userInfo.favoriteGenre }})
    }
  }, [userInfo, fetchRecommendedBooks]);

  if(!show){
    return null;
  }
  if(!userInfo || recommendedBooks.loading || !recommendedBooks.data){
    return(
      <div>loading...</div>
    )
  }

  return(
    <div>
      <h2>recommendation</h2>
      books in your favorite genre {userInfo.favoriteGenre}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {recommendedBooks.data.allBooks.map(book => 
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          )}
        </tbody>
        </table>
    </div>
  );
};

export default RecommendationPage;