import React, { useState } from "react";
import logo from "../../images/logo.svg";
import user from "../../images/user.png";
import list from "../../images/listmenu.svg";
import "./Header.scss";

export const Header = ({ onOpenModal }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header>
      <div className="container">
        <div className="headerFlex">
          <img src={logo} alt="logo" />

          <ul className="list">
            <li className="item"><h3 className="links">Who we are</h3></li>
            <li className="item"><h3 className="links">Contacts</h3></li>
            <li className="item"><h3 className="links">Menu</h3></li>
          </ul>

          <div className="loginInfo">
            <button onClick={onOpenModal} className="buttonSignUp">
              Sign Up
            </button>
            <img src={user} alt="user" />
          </div>

          {/* Mobile button */}
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
                <h3>Who we are</h3>
                <h3>Contacts</h3>
                <h3>Menu</h3>
                <button onClick={onOpenModal}>Sign Up</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};