import { useEffect, useState } from "react";
import temp from "../../../images/temprutare.svg";
import rain from "../../../images/rain.svg";
import pressure from "../../../images/pressure.svg";
import windy from "../../../images/windy.svg";
import visibility from "../../../images/visibility.svg";
import "./DetailedWeather.scss";

export const DetailedWeather = ({ city }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const API_KEY = "dffb5faf3da0fbd0a3322d7191b3c18f";

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    )
      .then((res) => res.json())
      .then((data) => setWeather(data));
  }, [city]);

  if (!weather) return null;

  return (
    <section className="detailedWeaather">
      <div className="container">
        <h2>Поточна погода в {weather.name}</h2>

        <ul className="weaather-dashboard__list">
          <li className="weather-dashboard__item">
            <div className="weather-dashboard__label">Feels like:</div>
            <div className="weather-dashboard__value">
              {weather.main.feels_like}°C
            </div>
            <img src={temp} alt="" className="weather-dashboard__icon" />
          </li>

          <li className="weather-dashboard__item">
            <div className="weather-dashboard__label">Min:</div>
            <div className="weather-dashboard__value">
              {weather.main.temp_min}°C
            </div>
            <div className="weather-dashboard__label">Max:</div>
            <div className="weather-dashboard__value">
              {weather.main.temp_max}°C
            </div>
          </li>

          <li className="weather-dashboard__item">
            <div className="weather-dashboard__label">Humidity:</div>
            <div className="weather-dashboard__value">
              {weather.main.humidity}%
            </div>
            <img src={rain} alt="" className="weather-dashboard__icon" />
          </li>

          <li className="weather-dashboard__item">
            <div className="weather-dashboard__label">Pressure:</div>
            <div className="weather-dashboard__value">
              {weather.main.pressure} hPa
            </div>
            <img src={pressure} alt="" className="weather-dashboard__icon" />
          </li>

          <li className="weather-dashboard__item">
            <div className="weather-dashboard__label">Wind speed:</div>
            <div className="weather-dashboard__value">
              {weather.wind.speed} m/s
            </div>
            <img src={windy} alt="" className="weather-dashboard__icon" />
          </li>

          <li className="weather-dashboard__item">
            <div className="weather-dashboard__label">Visibility:</div>
            <div className="weather-dashboard__value">
              {weather.visibility / 1000} km
            </div>
            <img src={visibility} alt="" className="weather-dashboard__icon" />
          </li>
        </ul>
      </div>
    </section>
  );
};