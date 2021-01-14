import { useState } from 'react';

export const useArrayExtract = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const extractGenresFromBooks = (listOfBooks) => {
    let genresToAdd = [];
    listOfBooks.map(b => b.genres)
      .reduce((listOfGenres, bookGenres) => {
        let thisBookGenres = [];
        bookGenres.forEach(g => {
          if(!listOfGenres.includes(g)){
            thisBookGenres.push(g);
          }
        });
        return listOfGenres.concat(thisBookGenres);
      })
      .forEach(g => {
        if(!value.includes(g)){
          genresToAdd.push(g);
        }
      });
    setValue(value.concat(genresToAdd));
  }
  return [value, extractGenresFromBooks];
};