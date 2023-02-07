import React from "react"
import "./FooterStyle.css"

import {FaFacebook, FaInstagram, FaTwitter, FaYoutube} from "react-icons/fa";

function Footer(){
    return(
        <div className="footer">
            <div className="container">
                <div className="top">
                    <h3>HOLIDAYS.</h3>
                    <div className="social">
                        <FaFacebook className="icon"/>
                        <FaInstagram className="icon"/>
                        <FaTwitter className="icon"/>
                        <FaYoutube className="icon"/>
                    </div>
                </div>
                <div className="bottom">
                    <div className="left">
                        <ul>
                            <li>O nas</li>
                            <li>Partnerzy</li>
                            <li>Kariera</li>
                        </ul>
                    </div>
                    <div className="right">
                        <ul>
                            <li>Kontakt</li>
                            <li>Zasady</li>
                            <li>FAQ</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Footer