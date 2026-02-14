import React, { useState, useEffect } from "react";
import { Header } from "./components/Header/Header.jsx"
// import { Hero } from "./components/Hero/Hero.jsx"
import { ShowForecast } from "./components/ShowForeacast/ShowForeacast.jsx";
import { Login } from "./components/Login/Login.jsx"

const App = () => {
   const [isModalOpen, setIsModalOpen] = useState(false)
   const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) setIsAuth(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setIsAuth(false);
  };

     return (

        <>
        
        {isModalOpen && (
         <Login  onClose={() => setIsModalOpen(false)}/>
        )}
        <Header onOpenModal={() => setIsModalOpen(true)} /> 
        <ShowForecast />
        </>
     )
}

export default App