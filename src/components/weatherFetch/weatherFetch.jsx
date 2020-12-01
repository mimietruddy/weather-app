import React, { useState, useContext } from 'react';
import Conditions from '../Conditions/Conditions';
import { ThemeContext } from '../context/ThemeContext';
import AppTheme from "../Colors";
import ThemeToggler from "../ThemeToggler";

const WeatherFetch = () => {

    let [city, setCity] = useState('');
    let [unit, setUnit] = useState('imperial');
    let [error, setError] = useState(false);
    let [loading, setLoading] = useState(false);

    const [isOpen, setIsOpen] = useState(false);
    const theme = useContext(ThemeContext)[0];
    const currentTheme = AppTheme[theme];
    const toggle = () => setIsOpen(!isOpen);

    const uriEncodedCity = encodeURIComponent(city);
    const api_key = process.env.REACT_APP_API_KEY;
    let [responseObj, setResponseObj] = useState({});

    function getWeatherFetch(e) {
        e.preventDefault();
        if (city.length === 0) {
            return setError(true);
        }
        setError(false);
        setResponseObj({});

        setLoading(true);
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${uriEncodedCity}&units=${unit}&APPID=${api_key}`,)

            .then(response => response.json()
            )
            .then(response => {

                if (response.cod !== 200) {
                    throw new Error()
                }
                setResponseObj(response)

            })

            .catch(err => {
                setError(true);
                setLoading(false);
                console.log(err.message);

            });

    }

    return (

        <div className="Wrapper"
        style={{
            backgroundColor: `${currentTheme.backgroundColor}`,
            color: `${currentTheme.textColor}`
        }}
        >
            <h2>Find Current Weather Conditions</h2>
            
           <button onClick={toggle}/>
<small className="mt-2" style={{position: "absolute", right: "5%"}}>
      Change Theme : <ThemeToggler/>
      </small>
            <form onSubmit={getWeatherFetch}>
                <input
                    type="text"
                    placeholder="Enter City"
                    maxLength="50"
                    className="TextInput"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <label className="Radio">
                    <input
                        type="radio"
                        name="units"
                        checked={unit === "imperial"}
                        value="imperial"
                        onChange={(e) => setUnit(e.target.value)}
                    />
                    Fahrenheit
                </label>
                <label className="Radio">
                    <input
                        type="radio"
                        name="units"
                        checked={unit === "metric"}
                        value="metric"
                        onChange={(e) => setUnit(e.target.value)}
                    />
                    Celcius
                </label>
                <button className="Button" type="submit">Get Weather Forecast</button>
            </form>
            <Conditions
                responseObj={responseObj}
                error={error}
                loading={loading}
            />

        </div>

    )
}


export default WeatherFetch;