import React, {useState, useEffect} from 'react';
import axios from 'axios';

const CountryDetails = ({country, showDetails}) => {
    
    const [show, setShow] = useState(showDetails);
    const [weather, setWeather] = useState({
        current:{
            temperature: '',
            weather_icons: [''],
            weather_descriptions: ['weather is not loaded yet'],
            wind_speed: '',
            wind_dir: ''
        }
    });
    useEffect(() => {
        axios
            .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${country.capital}`)
            .then(response => {
                console.log(response.data);
                if(!response.data.hasOwnProperty('success')){
                    setWeather(response.data);
                }
                    
            })
    }, [])
    const handleClick = () => {
        setShow(true);
        /*setTimeout(() => {
            axios
                .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${country.capital}`)
                .then(response => {
                    console.log(response.data);
                    if(!response.data.hasOwnProperty('success')){
                        setWeather(response.data);
                    }
                    
                })
        }, 0);*/
    }
    if(show === false){
        return(
            <div>
                {country.name} <button onClick = {handleClick}>show</button>
            </div>
        );
    }
    
    return(
        <div>
            <h1>{country.name}</h1>
            capital {country.capital} <br/>
            population {country.population}
            <h3>languages</h3>
            <ul>
                {country.languages.map(language => {
                    return <li key = {language.iso639_1}>{language.name}</li>
                })}
            </ul>
            <img src = {country.flag} alt = {country.name} height = {100} width = {150}/>
            <h3>Weather in {country.capital}</h3>
            <b>temperature: </b> {weather.current.temperature} Celsius <br/>
            <img src = {weather.current.weather_icons[0]} alt = {weather.current.weather_descriptions[0]} height = {50} width = {50}/>
            <br/> <b>wind: </b> {weather.current.wind_speed} km/h direction {weather.current.wind_dir}
        </div>
    );
    
}

export default CountryDetails;