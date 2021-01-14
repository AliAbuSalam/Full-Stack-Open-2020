import { gql } from '@apollo/client';

const BOOK_DETAILS = gql`
  fragment bookDetails on Book {
    title
    id
    author{
      name
    }
    published
    genres
  }
`

export const INITIALIZE_APP = gql`
query {
  allAuthors {
    name
    id
    born
    bookCount
  }
  allBooks {
    title
    author{
      name
    }
    published
    id
    genres
  }
}
`

export const FETCH_BOOKS = gql`
query {
  allBooks {
    title
    author {
      name
    }
    published
    id
  }
}
`

export const ADD_BOOK = gql`
mutation addBook(
  $bookTitle: String!, 
  $bookAuthor: String!, 
  $publishYear: Int!, 
  $bookGenres: [String!]!
){
  addBook(
    title: $bookTitle
    author: $bookAuthor
    published: $publishYear
    genres: $bookGenres
  ){
    id
  }
}
`

export const SET_BIRTHYEAR = gql`
  mutation setBirth(
    $authorName: String!
    $bornYear: Int!
  ){
    editAuthor(
      name: $authorName
      setBornTo: $bornYear
    ){
      id
      name
      born
    }
  }
`

export const LOGIN = gql`
  mutation token(
    $username: String!
    $password: String!
  ){
    login(
      username: $username
      password: $password
    ){
      value
    }
  }
`

export const FETCH_USER_INFO = gql`
  query userInfo{
    me {
      username
      favoriteGenre
    }
  }
`

export const FETCH_ALL_BOOKS = gql`
  query allBooks{
    allBooks {
      id
      title
      author {
        name
      }
      published
      genres
    }
  }
`

export const FETCH_BOOKS_BY_GENRE = gql`
  query booksByGenre(
    $genre: String
  ){
    allBooks(
      genre: $genre
    ){
      id
      title
      author {
        name
      }
      published
      genres
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded{
      ...bookDetails
    }
  }
${BOOK_DETAILS}
`