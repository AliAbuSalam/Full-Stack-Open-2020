import React from 'react';
import CountryDetails from './CountryDetails';

const CountriesView = ({countryList}) => {
    if(countryList.length > 10){
        return(
            <>
                Too many matches, specify another filter
            </>
        );
    }
    if(countryList.length === 0) {
        return(<></>);
    }
    if(countryList.length === 1) {
        return(
           <CountryDetails country = {countryList[0]} showDetails = {true}/>
        );
    }
    return(
        <>
            {countryList.map((nation, index) => 
                <div key = {index}><CountryDetails country = {nation} showDetails = {false} /></div>
            )}
        </>
    );
}

export default CountriesView;