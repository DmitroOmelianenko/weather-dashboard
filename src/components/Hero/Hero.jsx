import React from "react";
import line from '../../images/linehero.svg'
import search from '../../images/search.svg'
import '../../styles/_global.scss'
import './Hero.scss'

export const Hero = () => {
    const today = new Date();
    const options = { 
        year: "numeric", 
        month: "long", 
        day: "numeric", 
        weekday: "long" 
    };
    
    const formattedDate = today.toLocaleDateString("en-US", options);

    return (
        <>
            <section className="hero">
                <div className="container">
                    <h1 className="heroTitle">Weather dashboard</h1>
                    <div className="heroFlex">
    {/* Лінія тепер перша в коді для зручності */}
    <img src={line} alt="linehero" className="heroLine" />
    
    <div className="heroTextGroup">
        <h2 className="heroInfo">
            Create your personal list of favorite cities and always be aware of the weather.
        </h2>
        <h2 className="heroDate">{formattedDate}</h2>
    </div>
</div>

                    <div className="heroFlex2">
                        <input type="text" className="heroInput" placeholder="Search location..." />
                        <button type="button" className="search">
                            <img src={search} alt="search" className="imgSearch" />
                        </button>
                    </div>
                </div>
            </section>
        </>
    )
}
