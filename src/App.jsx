import React from "react";
import { Header } from "./components/Header/Header.jsx"
import { Hero } from "./components/Hero/Hero.jsx"
import { ShowForecast } from "./components/ShowForeacast/ShowForeacast.jsx";

const App = () => {
     return (

        <>
        <Header /> 
        <ShowForecast />
        </>
     )
}

export default App