import React, {useState, useEffect} from 'react';
import axios from 'axios';
import CountriesView from './components/CountriesView';

const App = () => {
  const [filterForm, setFilterForm] = useState('');
  const [countryFilter, setCountryFilter] = useState('');
  const [listOfCountries, setListOfCountries] = useState([]);

  useEffect(() => {
    axios
      .get('http://restcountries.eu/rest/v2/all')
      .then(response => {
        setListOfCountries(response.data);
        console.log(response.data);
        console.log(listOfCountries);
      })      
  },[])

  const countryFilterHandleChange = (event) => {
    setFilterForm(event.target.value);
  }

  const filterSubmit = (event) => {
    event.preventDefault();
    setCountryFilter(filterForm);
    setFilterForm('');
  }

  const filteredListOfCountries = countryFilter === '' ? [] :listOfCountries.filter(country => 
    country.name.toLowerCase().includes(countryFilter.toLowerCase())
  )
  
  return(
    <div>
      <form onSubmit = {filterSubmit}>
        find countries <input onChange = {countryFilterHandleChange} value = {filterForm}/>
      </form>
      <CountriesView countryList = {filteredListOfCountries} />
    </div>
  );
};

export default App;