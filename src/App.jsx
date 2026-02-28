// src/App.jsx
import React, { useState, useEffect } from "react";
import { Header } from "./components/Header/Header.jsx";
import { Hero } from "./components/Hero/Hero.jsx";
import { ShowForecast } from "./components/ShowForeacast/ShowForeacast.jsx";
import { Login } from "./components/Login/Login.jsx";
import { FactsDay } from "./components/FactsDay/FactsDay.jsx";
import { ImagesGalery } from "./components/ImagesGalery/ImagesGalery.jsx";
import { Footer } from "./components/Footer/Footer.jsx";
import { DetailedWeather } from "./components/HiddenFunctions/DetailedWeather/DetailedWeather.jsx";
// import { HourlyForecastChart } from "./components/HiddenFunctions/Schedule/Schedule.jsx";
import { ForecastOn8Days } from "./components/HiddenFunctions/ForecastOn8Days/ForecastOn8Days.jsx";
import { HourlyForecastChart } from "./components/HiddenFunctions/Schedule/Schedule.jsx";

const API_KEY = "fb76fda02c6e2aed31e4ed44cf3f1f65";
const STORAGE_KEY = "weather_cards_v1";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("Kyiv"); // для DetailedWeather
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (user) setIsAuth(true);

    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setCards(JSON.parse(raw));
      } catch (e) {
        console.error("Не вдалось розпарсити saved cards", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
  }, [cards]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setIsAuth(false);
  };

  // Викликається з Hero: додає одну картку з поточною погодою
  const onSearch = async (cityFromHero) => {
    const cityName = (cityFromHero || query || "").trim();
    if (!cityName) return;

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          cityName
        )}&appid=${API_KEY}&units=metric`
      );
      if (!res.ok) {
        console.error("City not found or API error");
        return;
      }
      const data = await res.json();

      

      const newCard = {
        id: Date.now(),
        city: { name: data.name, country: data.sys?.country || "" },
        list: [
          {
            dt: data.dt, // unix seconds
            main: { temp: data.main.temp },
            weather: [
              {
                icon: data.weather?.[0]?.icon || "",
                description: data.weather?.[0]?.description || "",
                main: data.weather?.[0]?.main || ""
              }
            ]
          }
        ],
        favorite: false
      };

      setCards((prev) => [...prev, newCard]);
      setQuery("");
      setCity(data.name); // оновлюємо DetailedWeather
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const deleteCard = (id) => {
    setCards((prev) => prev.filter((c) => c.id !== id));
  };

  const toggleFavorite = (id) => {
    setCards((prev) => prev.map((c) => (c.id === id ? { ...c, favorite: !c.favorite } : c)));
  };

  const refreshCard = async (id) => {
    const card = cards.find((c) => c.id === id);
    if (!card) return;
    const cityName = card.city?.name;
    if (!cityName) return;

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          cityName
        )}&appid=${API_KEY}&units=metric`
      );
      if (!res.ok) return;
      const data = await res.json();

      const updated = {
        ...card,
        list: [
          {
            dt: data.dt,
            main: { temp: data.main.temp },
            weather: [
              {
                icon: data.weather?.[0]?.icon || "",
                description: data.weather?.[0]?.description || "",
                main: data.weather?.[0]?.main || ""
              }
            ]
          }
        ]
      };

      setCards((prev) => prev.map((c) => (c.id === id ? updated : c)));
      // Якщо оновлена картка — можна також оновити DetailedWeather, якщо потрібно:
      // setCity(data.name);
    } catch (e) {
      console.error("Refresh error", e);
    }
  };

  return (
    <>
    {isModalOpen && (
  <Login
    onClose={() => setIsModalOpen(false)}
    onLogin={() => setIsAuth(true)}
  />
)}
      <Header onOpenModal={() => setIsModalOpen(true)} onLogout={handleLogout} isAuth={isAuth} />
<Hero query={query} setQuery={setQuery} onSearch={() => onSearch(query)} /> 
      <ShowForecast
  cards={cards}
  onDelete={deleteCard}
  onToggleFavorite={toggleFavorite}
  onRefreshCard={refreshCard}
  isAuth={isAuth}
/>
    {isAuth && (
  <section id="detailed">
    <DetailedWeather city={city} />
  </section>
)}

{isAuth && (
  <section id="hourly">
    <HourlyForecastChart city={city} />
  </section>
)}

{isAuth && (
  <section id="forecast8">
    <ForecastOn8Days city={city} />
  </section>
)}
      <FactsDay />
      <ImagesGalery />
      <Footer />
    </>
  );
};

export default App;
