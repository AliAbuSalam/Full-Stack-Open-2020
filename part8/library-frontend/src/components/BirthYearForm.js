import React, { useState } from 'react';
import { SET_BIRTHYEAR } from '../queries';
import { useMutation } from '@apollo/client';

const BirthYearForm = ({ allAuthors }) => {
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [bornYear, setBornYear] = useState('');
  const [setBirthYear] = useMutation(SET_BIRTHYEAR);
  
  const submit = (event) => {
    event.preventDefault();

    setBirthYear({ variables: {
      authorName: selectedAuthor,
      bornYear: parseInt(bornYear, 10)
    }});
    setBornYear('');
  };

  const handleChange = (event) => {
    setSelectedAuthor(event.target.value);
  };

  return(
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          <select onChange={handleChange}>
            {allAuthors.map(a => 
              <option key={a.id} value={a.name}>{a.name}</option>  
            )}
          </select>
        </div>
        <div>
          born <input type='number' value={bornYear} onChange={({ target }) => setBornYear(target.value)}/>
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  );
};

export default BirthYearForm;