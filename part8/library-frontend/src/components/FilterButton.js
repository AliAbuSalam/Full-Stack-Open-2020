import React from 'react';

const FilterButton = ({ filterList, changeFilter}) => {
  const listOfFilters = filterList ? filterList : [];


  if(listOfFilters.length === 0){
    return null;
  }
  return(
    <div>
      {listOfFilters
        .map((genre, index) => 
          <button 
            key={index} 
            value={genre} 
            onClick={({ target }) => changeFilter(target.value)}
          >
            {genre}
          </button>
        )
      }
  </div>
  );
}

export default FilterButton;