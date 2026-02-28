import React, { useState, useEffect } from "react";
import refresh from "../../images/refresh.svg";
import deleteicon from "../../images/delete.svg";
import toast, { Toaster } from "react-hot-toast";
import "./ShowForeacast.scss";

const cities = [
  "Prague", "London", "Berlin", "Paris", "Madrid", "Rome",
  "Warsaw", "Kyiv", "New York", "Tokyo", "Toronto", "Lisbon",
  "Vienna", "Budapest", "Amsterdam", "Brussels"
];

const FAV_KEY = "fav_card_v1";          // { city: "Kyiv", id: 1700000000 }
const RAND_KEY = "random_cards_v1";     // { city: "Kyiv", ids: [..3 ids..] }

export const ShowForecast = ({
  cards = [],
  onDelete = () => {},
  onToggleFavorite = () => {},
  onRefreshCard = () => {},
  isAuth = false
}) => {
  const [forecast, setForecast] = useState(null);
  const [randomItems, setRandomItems] = useState([]);
  const [fav, setFav] = useState(null); // { city, id }

  const [suggestions, setSuggestions] = useState([]);
  const [query, setQuery] = useState("");

  const apiKey = "fb76fda02c6e2aed31e4ed44cf3f1f65";

  useEffect(() => {
    const savedFav = JSON.parse(localStorage.getItem(FAV_KEY) || "null");
    setFav(savedFav);

    const startCity = savedFav?.city
      ? savedFav.city
      : cities[Math.floor(Math.random() * cities.length)];

    fetchForecast(startCity);
  }, []);

  const pickRandom3 = (list) => {
    const copy = [...list];
    copy.sort(() => Math.random() - 0.5);
    return copy.slice(0, 3);
  };

  const fetchForecast = async (city) => {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
    );
    const data = await res.json();
    setForecast(data);

    const savedRand = JSON.parse(localStorage.getItem(RAND_KEY) || "null");

    // якщо є збережені 3 ids для цього міста — беремо їх (НЕ генеруємо нові)
    if (savedRand?.city === data.city.name && Array.isArray(savedRand.ids)) {
      const map = new Map(data.list.map((it) => [it.dt, it]));
      const items = savedRand.ids.map((id) => map.get(id)).filter(Boolean);

      if (items.length === 3) {
        setRandomItems(items);
        return;
      }
    }

    // інакше генеруємо 3 і зберігаємо
    const items = pickRandom3(data.list);
    setRandomItems(items);
    localStorage.setItem(RAND_KEY, JSON.stringify({ city: data.city.name, ids: items.map((x) => x.dt) }));
  };

  const handleInputChange = (value) => {
    setQuery(value);
    const filtered = cities.filter((c) => c.toLowerCase().startsWith(value.toLowerCase()));
    setSuggestions(value ? filtered : []);
  };

  const goToSection = (id) => {
    if (!isAuth) {
      toast.error("Please register to access these features");
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const toggleFavLocal = (cityName, id) => {
    // якщо натиснули вдруге на ту саму — прибираємо favorite і дозволяємо random знову
    if (fav?.city === cityName && fav?.id === id) {
      setFav(null);
      localStorage.removeItem(FAV_KEY);
      localStorage.removeItem(RAND_KEY);
      return;
    }

    const next = { city: cityName, id };
    setFav(next);
    localStorage.setItem(FAV_KEY, JSON.stringify(next));

    // зафіксуємо 3 карточки, щоб після перезавантаження вони не мінялись
    if (forecast?.city?.name === cityName && randomItems.length === 3) {
      localStorage.setItem(
        RAND_KEY,
        JSON.stringify({ city: cityName, ids: randomItems.map((x) => x.dt) })
      );
    }
  };

  const renderCard = (card, item, isLocal = false) => {
    const cityName = card.city.name;
    const isFav = isLocal ? (fav?.city === cityName && fav?.id === card.id) : !!card.favorite;

    return (
      <div className="weatherCard" key={card.id}>
        <div className="weatherHeader">
          <h2 className="showForecastCityName">
            {card.city.name}, {card.city.country}
          </h2>

          <p className="showForecastCountry">
            {new Date(item.dt * 1000).toLocaleDateString("en-US", {
              weekday: "long",
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </p>

          <button type="button" className="buttonDetailed" onClick={() => goToSection("hourly")}>
            Hourly forecast
          </button>

          <p>
            {new Date(item.dt * 1000).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>

        <div className="weatherBody">
          <img
            className="weatherFoto"
            src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
            alt=""
          />
          <h2 className="weatherTemruture">{Math.round(item.main.temp)}°C</h2>
          <p>{item.weather[0].main}</p>
        </div>

        <div className="weatherFooter">
          <button
            type="button"
            className="refreshButton"
            onClick={() => (isLocal ? fetchForecast(card.city.name) : onRefreshCard(card.id))}
          >
            <img src={refresh} className="refreshIcon" alt="" />
          </button>

          <button
            type="button"
            className={`heartButton ${isFav ? "heartButton--active" : ""}`}
            onClick={() => (isLocal ? toggleFavLocal(cityName, card.id) : onToggleFavorite(card.id))}
          >
            <svg viewBox="0 0 16 16" height="25" width="25" className="heartIcon" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
                fillRule="evenodd"
              />
            </svg>
          </button>

          <button type="button" className="orangeBtn" onClick={() => goToSection("detailed")}>
            See more
          </button>

          <button type="button" className="deleteIconButton" onClick={() => (isLocal ? null : onDelete(card.id))}>
            <img src={deleteicon} className="deleteIcon" alt="" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <section className="showForecast">
      <Toaster />
      <div className="container">

        {suggestions.length > 0 && (
          <ul className="showForecastList">
            {suggestions.map((city, i) => (
              <li
                key={i}
                className="showForecastItem"
                onClick={() => {
                  setQuery(city);
                  fetchForecast(city);
                  setSuggestions([]);
                }}
              >
                {city}
              </li>
            ))}
          </ul>
        )}

        <div className="showForecastGrid">
          {cards.length > 0 && cards.map((card) => renderCard(card, card.list[0], false))}

          {cards.length === 0 && forecast && randomItems.map((item) =>
            renderCard({ id: item.dt, city: forecast.city }, item, true)
          )}
        </div>
      </div>
    </section>
  );
};