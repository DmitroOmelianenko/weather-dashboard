import React, { useEffect, useState } from "react";
import { Header } from "./components/Header/Header.jsx";
import { Hero } from "./components/Hero/Hero.jsx";
import { ShowForecast } from "./components/ShowForeacast/ShowForeacast.jsx";
import { Login } from "./components/Login/Login.jsx";
import { FactsDay } from "./components/FactsDay/FactsDay.jsx";
import { ImagesGalery } from "./components/ImagesGalery/ImagesGalery.jsx";
import { Footer } from "./components/Footer/Footer.jsx";
import { DetailedWeather } from "./components/HiddenFunctions/DetailedWeather/DetailedWeather.jsx";
import { ForecastOn8Days } from "./components/HiddenFunctions/ForecastOn8Days/ForecastOn8Days.jsx";
import { HourlyForecastChart } from "./components/HiddenFunctions/Schedule/Schedule.jsx";

const API_KEY = "fb76fda02c6e2aed31e4ed44cf3f1f65";
const STORAGE_KEY = "weather_cards_v1";

export default function App() {
  const [open, setOpen] = useState(false);
  const [auth, setAuth] = useState(false);
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("Kyiv");
  const [cards, setCards] = useState([]);

  useEffect(() => {
    setAuth(!!localStorage.getItem("currentUser"));
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setCards(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
  }, [cards]);

  const logout = () => {
    localStorage.removeItem("currentUser");
    setAuth(false);
  };

  const makeCard = (data) => ({
    id: Date.now(),
    city: { name: data.name, country: data.sys?.country || "" },
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
    ],
    favorite: false
  });

  const fetchWeather = async (name) => {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        name
      )}&appid=${API_KEY}&units=metric`
    );
    return res.json();
  };

  const onSearch = async (name) => {
    const cityName = (name || query).trim();
    if (!cityName) return;

    const data = await fetchWeather(cityName);
    const newCard = makeCard(data);

    setCards((p) => [...p, newCard]);
    setQuery("");
    setCity(data.name);
  };

  const del = (id) => setCards((p) => p.filter((c) => c.id !== id));

  const fav = (id) =>
    setCards((p) =>
      p.map((c) => (c.id === id ? { ...c, favorite: !c.favorite } : c))
    );

  const refresh = async (id) => {
    const card = cards.find((c) => c.id === id);
    const data = await fetchWeather(card.city.name);
    setCards((p) => p.map((c) => (c.id === id ? { ...c, ...makeCard(data), id } : c)));
  };

  return (
    <>
      {open && <Login onClose={() => setOpen(false)} onLogin={() => setAuth(true)} />}

      <Header onOpenModal={() => setOpen(true)} onLogout={logout} isAuth={auth} />
      <Hero query={query} setQuery={setQuery} onSearch={() => onSearch(query)} />

      <ShowForecast
        cards={cards}
        onDelete={del}
        onToggleFavorite={fav}
        onRefreshCard={refresh}
        isAuth={auth}
      />

      {auth && (
        <>
          <section id="detailed">
            <DetailedWeather city={city} />
          </section>
          <section id="hourly">
            <HourlyForecastChart city={city} />
          </section>
          <section id="forecast8">
            <ForecastOn8Days city={city} />
          </section>
        </>
      )}

      <FactsDay />
      <ImagesGalery />
      <Footer />
    </>
  );
}