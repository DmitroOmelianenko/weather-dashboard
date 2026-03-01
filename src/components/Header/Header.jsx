import React, { useState } from "react";
import logo from "../../images/logo.svg";
import user from "../../images/user.png";
import list from "../../images/listmenu.svg";
import "./Header.scss";

export const Header = ({ onOpenModal, currentUser, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMobile = () => setIsOpen(false);

  return (
    <header>
      <div className="container">
        <div className="headerFlex">
          <img src={logo} alt="logo" />

          <ul className="list">
            <li className="item">
              <a href="#about" className="links">Who we are</a>
            </li>

            <li className="item">
              <a href="#contacts" className="links">Contacts</a>
            </li>

            <li className="item">
              <a href="#menu" className="links">Menu</a>
            </li>
          </ul>

          <div className="loginInfo">
            {currentUser ? (
              <>
                <span className="welcomeText">Вітаємо, {currentUser.username}</span>
                <button className="buttonSignUp logoutButton" onClick={onLogout}>
                  Log Out
                </button>
              </>
            ) : (
              <button onClick={onOpenModal} className="buttonSignUp">
                Sign Up
              </button>
            )}

            <img src={user} alt="user" />
          </div>

          <div className="mobileSection">
            <button
              type="button"
              className="menuButton"
              onClick={() => setIsOpen(!isOpen)}
            >
              Menu
              <img src={list} alt="menu" />
            </button>

            {isOpen && (
              <div className="mobileMenu">
                <a href="#about" onClick={closeMobile}>Who we are</a>
                <a href="#contacts" onClick={closeMobile}>Contacts</a>
                <a href="#menu" onClick={closeMobile}>Menu</a>

                {currentUser ? (
                  <>
                    <h3 className="welcome">Вітаємо, {currentUser.username}</h3>
                    <button
                      className="buttonSignUp logoutButton"
                      onClick={() => {
                        onLogout();
                        closeMobile();
                      }}
                    >
                      Log Out
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      onOpenModal();
                      closeMobile();
                    }}
                  >
                    Sign Up
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};