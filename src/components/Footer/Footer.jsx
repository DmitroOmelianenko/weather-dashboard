import React from "react";
import "./Footer.scss"
import logo from "../../images/logo.svg"
import insta from "../../images/instagram.svg"
import facebook from "../../images/facebook.svg"
import whatsapp from "../../images/whatsapp.svg"

export const Footer = () => {
    return (
        <footer>
            <div className="container">
                <div className="footerFlex">
                    <img src={logo} alt="logo" />
                    <ul className="footerList">
                        <li className="footerLink">
                            <h2 className="footerLinkTitle">Address</h2>
                            <p className="footerDescriprionAddress">Svobody str. 35
                                Kyiv
                                Ukraine</p>
                        </li>
                        <li className="footerLink">
                            <h2 className="footerLinkTitle">Contact us</h2>
                            <ul className="socialsList">
                                <li className="socialsItem">
                                    <img src={insta} alt="" className="socialsPhoto" />
                                </li>
                                <li className="socialsItem">
                                    <img src={facebook} alt="" className="socialsPhoto" />
                                </li>
                                <li className="socialsItem">
                                    <img src={whatsapp} alt="" className="socialsPhoto" />
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}