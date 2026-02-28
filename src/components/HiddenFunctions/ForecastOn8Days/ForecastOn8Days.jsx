import { useEffect, useState } from "react";
import "./ForecastOn8Days.scss";

const API_KEY = "dffb5faf3da0fbd0a3322d7191b3c18f";

export const ForecastOn8Days = ({ city }) => {
  const [days, setDays] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        const result = data.list.filter((_, i) => i % 8 === 0).slice(0, 8);
        setDays(result);
      });
  }, [city]);

  return (
    <section className="forecast-8">
    <div className="container">
      <div className="forecast-8__wrapper">
        <h2 className="forecast-8__title">5-day forecast</h2>

        <ul className="forecast-8__list">
          {days.map((item) => (
            <li className="forecast-8__item" key={item.dt}>
              <p className="forecast-8__text forecast-8__date">
                {item.dt_txt.slice(0, 10)}
              </p>

              <div className="forecast-8__weather">
                <img
                  src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                  alt={item.weather[0].description}
                />
                <p className="forecast-8__text">
                  {Math.round(item.main.temp_max)}/{Math.round(item.main.temp_min)}℃
                </p>
              </div>

              <p className="forecast-8__text forecast-8__desc">
                {item.weather[0].description}
              </p>
            </li>
          ))}
        </ul>
      </div>
      </div>
    </section>
  );
};