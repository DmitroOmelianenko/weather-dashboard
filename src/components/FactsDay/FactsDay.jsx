import { useEffect, useState } from "react";
import "./FactsDay.scss";

export const FactsDay = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const API_KEY = "oOYHhZ9XDgOrFdPWh16lV6zzf0K6pH0T30DkrGGkwyIAUcqgccacIVHi";
  const PER_PAGE = 3;

  const loadPhotos = async (pageNumber) => {
    setLoading(true);
    const res = await fetch(
      `https://api.pexels.com/v1/search?query=pets&per_page=${PER_PAGE}&page=${pageNumber}`,
      { headers: { Authorization: API_KEY } }
    );
    const data = await res.json();
    setItems((prev) => [...prev, ...data.photos]);
    setLoading(false);
  };

  useEffect(() => {
    loadPhotos(page);
  }, []);

  const handleSeeMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadPhotos(nextPage);
  };

  return (
    <section className="facts-day">
      <div className="container">
        <h2 className="facts-day-title">Interacting with our pets</h2>

        <div className="facts-day-grid">
          {items.map((item) => (
            <div key={item.id} className="facts-day-card">
              <img src={item.src.medium} alt={item.alt} />
              <p>{item.alt}</p>
            </div>
          ))}
        </div>

        <button
          onClick={handleSeeMore}
          disabled={loading}
          className="facts-day-button"
        >
          {loading ? "Loading..." : "See more"}
        </button>
      </div>
    </section>
  );
};
