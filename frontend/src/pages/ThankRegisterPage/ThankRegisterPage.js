import style from "./ThankRegisterPage.module.css";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import {BiMap} from "react-icons/bi";
import {FaParking} from "react-icons/fa";
import {AiOutlineCheckCircle, AiOutlineWifi} from "react-icons/ai";
import {MdOutlineFamilyRestroom} from "react-icons/md";
import {MdSmokeFree} from "react-icons/md";
import {IoIosFitness} from "react-icons/io";
import {BiDrink} from "react-icons/bi";
import {FaUser} from "react-icons/fa";
import Element from "../SearchPage/Element";



function ThankRegisterPage(props) {

    return (
        <div className={style.form}>
            <div className={style.styl}>
                <div className={style.form2}>
                    <h1 className={style.form2}><AiOutlineCheckCircle/></h1>
                    <h1 className={style.form2}>Dziękujemy za rejestrację</h1>
                    <NavLink exact to={"/login"}> <p className={style.text}>Możesz teraz się zalogować</p></NavLink>

                </div>
            </div>
        </div>
    );
}

export default ThankRegisterPage;
