 import React from 'react';
 import BirthYearForm from './BirthYearForm';

const Authors = (props) => {
  if (!props.show) {
    return null
  }
  const authors = props.allAuthors ? props.allAuthors : [];

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <BirthYearForm allAuthors={props.allAuthors}/>
    </div>
  )
}

export default Authors
