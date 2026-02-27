import { useEffect, useState } from "react";
import temp from "../../../images/temprutare.svg";
import rain from "../../../images/rain.svg";
import pressure from "../../../images/pressure.svg";
import windy from "../../../images/windy.svg";
import visibility from "../../../images/visibility.svg";
import "./DetailedWeather.scss";

export const DetailedWeather = ({ city }) => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!city) return; // захист, якщо city порожній

    const API_KEY = "dffb5faf3da0fbd0a3322d7191b3c18f";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      city
    )}&appid=${API_KEY}&units=metric`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.cod && Number(data.cod) !== 200) {
          setError(data.message || "Помилка API");
          setWeather(null);
        } else {
          setWeather(data);
          setError(null);
        }
      })
      .catch((err) => {
        console.error("Error:", err);
        setError("Не вдалося завантажити дані");
        setWeather(null);
      });
  }, [city]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!weather) {
    return <p>Завантаження...</p>;
  }

  return (
    <section className="detailedWeather">
      <div className="container">
        <h2>Поточна погода в {weather.name}</h2>
        <ul className="weather-dashboard__list">
          <li className="weather-dashboard__item">
            <div className="weather-dashboard__label">Feels like:</div>
            <div className="weather-dashboard__value">
              {weather.main.feels_like}°C
            </div>
            <img
              src={temp}
              alt="Feels like icon"
              className="weather-dashboard__icon"
            />
          </li>
          <li className="weather-dashboard__item">
            <div className="weather-dashboard__label">Min:</div>
            <div className="weather-dashboard__value">
              {weather.main.temp_min}°C
            </div>
            <div className="weather-dashboard__label">Max:</div>
            <div className="weather-dashboard__value">{weather.main.temp_max}°C</div>
          </li>
          <li className="weather-dashboard__item">
            <div className="weather-dashboard__label">Humidity:</div>
            <div className="weather-dashboard__value">
              {weather.main.humidity}%
            </div>
            <img
              src={rain}
              alt="Humidity icon"
              className="weather-dashboard__icon"
            />
          </li>
          <li className="weather-dashboard__item">
            <div className="weather-dashboard__label">Pressure:</div>
            <div className="weather-dashboard__value">
              {weather.main.pressure} hPa
            </div>
            <img
              src={pressure}
              alt="Pressure icon"
              className="weather-dashboard__icon"
            />
          </li>
          <li className="weather-dashboard__item">
            <div className="weather-dashboard__label">Wind speed:</div>
            <div className="weather-dashboard__value">
              {weather.wind.speed} m/s
            </div>
            <img
              src={windy}
              alt="Wind icon"
              className="weather-dashboard__icon"
            />
          </li>
          <li className="weather-dashboard__item">
            <div className="weather-dashboard__label">Visibility:</div>
            <div className="weather-dashboard__value">
              {weather.visibility / 1000} km
            </div>
            <img
              src={visibility}
              alt="Visibility icon"
              className="weather-dashboard__icon"
            />
          </li>
        </ul>
      </div>
    </section>
  );
};
