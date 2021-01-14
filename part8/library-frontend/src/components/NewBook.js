import React, { useState } from 'react'
import { useMutation } from '@apollo/client';
import { ADD_BOOK, FETCH_BOOKS, FETCH_BOOKS_BY_GENRE } from '../queries';

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  const [ addBook ] = useMutation(ADD_BOOK, {
    refetchQueries: () => {
      let arrayOfQueries = [{ query: FETCH_BOOKS }];
      const genresToQueries = genres.map(genre => {
        return {
          query: FETCH_BOOKS_BY_GENRE,
          variables: {
            genre
          }
        }
      });
      return arrayOfQueries.concat(genresToQueries);
    },
    awaitRefetchQueries: true,
    onError: (error) => {
      if(error.graphQLErrors.length > 0){
        console.log('error: ', error.graphQLErrors[0].message);
      } else {
        console.log('error: ', error.message);
      }
    }
  });


  if (!props.show) {
    return null
  }

  const submit = (event) => {
    event.preventDefault()

    addBook({ variables: {
      bookTitle: title,
      bookAuthor: author,
      publishYear: parseInt(published, 10),
      bookGenres: genres
    }}).then(() => setGenres([]));

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook