import React from "react";
import logo from '../../images/logo.svg'
import user from '../../images/user.png'
import list from '../../images/listmenu.svg'
import '../../styles/_variebles.scss'
import './Header.scss'

export const Header = () => {


    return (
        <>
            <header>
                <div className="container">
                    <div className="headerFlex">
                        <img src={logo} alt="logo" />
                        <ul className="list">
                            <li className="item">
                                <h3 className="links">Who we are</h3>
                            </li>
                            <li className="item">
                                <h3 className="links">Contacts</h3>
                            </li>
                            <li className="item">
                                <h3 className="links">Menu</h3>
                            </li>
                        </ul>
                        <div className="loginInfo">
                            <button type="button" className="buttonSignUp">Sign Up</button>
                            <img src={user} alt="user" />
                        </div>
                        <div className="mobileSection">
                            <button type="button" className="menuButton">Menu
                                <img src={list} alt="list" /></button>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}