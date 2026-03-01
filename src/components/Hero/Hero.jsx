import { useState } from "react";
import line from "../../images/linehero.svg";
import search from "../../images/search.svg";
import "../../styles/_global.scss";
import "./Hero.scss";

export const Hero = ({ query, setQuery, onSearch }) => {
  const [error, setError] = useState(false);

  const today = new Date();
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  };

  const formattedDate = today.toLocaleDateString("en-US", options);

  const handleSearch = () => {
    if (!query.trim()) {
      setError(true);
      setTimeout(() => setError(false), 2000);
      return;
    }

    onSearch();
  };

  return (
    <section className="hero">
      <div className="container">
        <h1 className="heroTitle">Weather dashboard</h1>

        <div className="heroFlex">
          <img src={line} alt="line hero" className="heroLine" />

          <div className="heroTextGroup">
            <h2 className="heroInfo">
              Create your personal list of favorite cities and always be aware
              of the weather.
            </h2>

            <h2 className="heroDate">{formattedDate}</h2>
          </div>
        </div>

        <div className="heroFlex2" style={{ position: "relative" }}>
          <input
            type="text"
            className={`heroInput ${error ? "inputError" : ""}`}
            placeholder="Search location..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
          />

          <button
            type="button"
            className="search"
            onClick={handleSearch}
          >
            <img src={search} alt="search icon" />
          </button>
        </div>
      </div>
    </section>
  );
};