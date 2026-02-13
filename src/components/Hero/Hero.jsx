import React from "react";
import line from '../../images/linehero.svg'
import search from '../../images/search.svg'
import '../../styles/_global.scss'
import './Hero.scss'

export const Hero = ({ query, setQuery, onSearch }) => {
    const today = new Date();
    const options = { year: "numeric", month: "long", day: "numeric", weekday: "long" };
    const formattedDate = today.toLocaleDateString("en-US", options);

    return (
        <section className="hero">
            <div className="container">
                <h1 className="heroTitle">Weather dashboard</h1>
                <div className="heroFlex">
                    <img src={line} alt="linehero" className="heroLine" />
                    <div className="heroTextGroup">
                        <h2 className="heroInfo">
                            Create your personal list of favorite cities and always be aware of the weather.
                        </h2>
                        <h2 className="heroDate">{formattedDate}</h2>
                    </div>
                </div>

                {/* Контейнер з position: relative для списку */}
                <div className="heroFlex2" style={{ position: "relative" }}>
                    <input
                        type="text"
                        className="heroInput"
                        placeholder="Search location..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && onSearch()}
                    />
                    <button type="button" className="search" onClick={onSearch}>
                        <img src={search} alt="search" className="imgSearch" />
                    </button>
                </div>
            </div>
        </section>
    )
}
