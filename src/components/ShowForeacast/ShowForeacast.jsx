import React, { useState, useEffect } from "react";
import refresh from "../../images/refresh.svg"
import heart from "../../images/heart.svg"
import deleteicon from "../../images/delete.svg"
import { Hero } from "../Hero/Hero.jsx"
import "./ShowForeacast.scss"

const cities = [
    "Prague", "London", "Berlin", "Paris", "Madrid", "Rome",
    "Warsaw", "Kyiv", "New York", "Tokyo", "Toronto", "Lisbon",
    "Vienna", "Budapest", "Amsterdam", "Brussels"
];

export const ShowForecast = () => {
    const [query, setQuery] = useState("");
    const [forecast, setForecast] = useState(null);
    const [suggestions, setSuggestions] = useState([]);

    const apiKey = "fb76fda02c6e2aed31e4ed44cf3f1f65";

    useEffect(() => {
        const randomCity = cities[Math.floor(Math.random() * cities.length)];
        fetchForecast(randomCity);
    }, []);

    const fetchForecast = async (city) => {
        try {
            const res = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
            );
            const data = await res.json();
            setForecast(data);
        } catch (err) {
            console.error("Error fetching forecast:", err);
        }
    };

    const onSearch = () => {
        if (query.trim() !== "") {
            fetchForecast(query);
            setSuggestions([]);
        }
    };

    const handleInputChange = (value) => {
        setQuery(value);
        if (value.length > 0) {
            const filtered = cities.filter((c) =>
                c.toLowerCase().startsWith(value.toLowerCase())
            );
            setSuggestions(filtered);
        } else {
            setSuggestions([]);
        }
    };

    return (
        <section className="showForecast">
            <div className="container">
                <Hero query={query} setQuery={handleInputChange} onSearch={onSearch} />

                {suggestions.length > 0 && (
                    <ul className="showForecastList">
                        {suggestions.map((city, i) => (
                            <li
                                key={i}
                                onClick={() => {
                                    setQuery(city);
                                    fetchForecast(city);
                                    setSuggestions([]);
                                }}
                                className="showForecastItem"
                            >
                                {city}
                            </li>
                        ))}
                    </ul>
                )}

                {forecast && forecast.list && (
                    <div className="showForecastGrid">
                        {forecast.list.slice(0, 6).map((item, index) => (
                            <div className="weatherCard" key={index}>
                                <div className="weatherHeader">
                                    <h2 className="showForecastCityName">{forecast.city.name}, {forecast.city.country}</h2>
                                    <p className="showForecastCountry">{new Date(item.dt * 1000).toLocaleDateString("en-US", {
                                        weekday: "long", day: "2-digit", month: "2-digit", year: "numeric"
                                    })}</p>
                                    <button className="buttonDetailed" >Hourly forecast</button>
                                    <p>{new Date(item.dt * 1000).toLocaleTimeString("en-US", {
                                        hour: "2-digit", minute: "2-digit"
                                    })}</p>
                                </div>

                                <div className="weatherBody">
                                    <img
                                        className="weatherFoto"
                                        src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                                        alt={item.weather[0].description}
                                    />
                                    <h2 className="weatherTemruture">{Math.round(item.main.temp)}°C</h2>
                                    <p>{item.weather[0].main}</p>
                                </div>

                                <div className="weatherFooter">
                                    <button type="submit" className="refreshButton" onClick={() => window.location.reload()}>
                                        <img src={refresh} className="refreshIcon" alt="refresh" />
                                    </button>
                                    <button type="button" className="heartButton">
                                        {/* From Uiverse.io by Tsiangana */}
                                        <label className="ui-bookmark">
                                            <input type="checkbox" />
                                            <div className="bookmark">
                                                <svg
                                                    viewBox="0 0 16 16"
                                                    className="bi bi-heart-fill"
                                                    height="25"
                                                    width="25"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
                                                        fillRule="evenodd"
                                                    />
                                                </svg>
                                            </div>
                                        </label>

                                    </button>


                                    <button className="orangeBtn">See more</button>
                                    <button type="button" className="deleteIconButton">
                                        <img src={deleteicon} className="deleteIcon" alt="deleteicon" />
                                    </button>
                                    
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};
