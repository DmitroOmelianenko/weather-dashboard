// DetailedWeather.jsx
import React, { useEffect, useState } from "react";

export const DetailedWeather = ({ city, isLoggedIn }) => {
  const [weather, setWeather] = useState(null);
  const API_KEY = "fb76fda02c6e2aed31e4ed44cf3f1f65";

  useEffect(() => {
    if (!city || !isLoggedIn) return;

    const fetchWeather = async () => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=ua`
        );
        const data = await res.json();
        setWeather(data);
      } catch (err) {
        console.error("Помилка завантаження погоди:", err);
      }
    };

    fetchWeather();
  }, [city, isLoggedIn]);

  if (!isLoggedIn) {
    return null; // якщо не залогінений — нічого не показуємо
  }

  if (!weather) {
    return <p>Завантаження даних...</p>;
  }

  return (
    <div className="detailed-weather">
      <h2>Погода в {weather.name}</h2>
      <div className="weather-grid">
        <div>🌡️ Відчувається як: {weather.main.feels_like}°C</div>
        <div>⬇️ Мін: {weather.main.temp_min}°C / ⬆️ Макс: {weather.main.temp_max}°C</div>
        <div>💧 Вологість: {weather.main.humidity}%</div>
        <div>⚖️ Тиск: {weather.main.pressure} hPa</div>
        <div>💨 Вітер: {weather.wind.speed} м/с</div>
        <div>👁️ Видимість: {weather.visibility / 1000} км</div>
      </div>
    </div>
  );
};

