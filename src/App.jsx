import React, { useState, useEffect } from "react";
import { Header } from "./components/Header/Header.jsx";
// import { Hero } from "./components/Hero/Hero.jsx"; 
import { ShowForecast } from "./components/ShowForeacast/ShowForeacast.jsx";
import { Login } from "./components/Login/Login.jsx";
import { FactsDay } from "./components/FactsDay/FactsDay.jsx";
import { ImagesGalery } from "./components/ImagesGalery/ImagesGalery.jsx";
import { Footer } from "./components/Footer/Footer.jsx";
import { DetailedWeather } from "./components/HiddenFunctions/DetailedWeather/DetailedWeather.jsx";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [city, setCity] = useState(""); // додали стан для міста

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (user) setIsAuth(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setIsAuth(false);
  };

  return (
    <>
      {isModalOpen && <Login onClose={() => setIsModalOpen(false)} />}
      <Header onOpenModal={() => setIsModalOpen(true)} />
      <ShowForecast onCityChange={setCity} /> 
      <DetailedWeather city={city} isLoggedIn={isAuth} />

      <FactsDay />
      <ImagesGalery />
      <Footer />
      
    </>
  );
};

export default App;
