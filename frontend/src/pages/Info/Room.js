import React, {useState} from "react"
import  style from "./RoomStyle.module.css"

import  Video from "../../assets/maldivesVideo.mp4"
import useAuth from "../../hooks/useAuth";
import {AiOutlineSearch, AiOutlineUser} from "react-icons/ai";

import krakow from "../../assets/krakow.jpg"
import wroclaw from "../../assets/wroclaw.jpg"
import gdansk from "../../assets/gdansk.jpg"
import warszawka from "../../assets/warszawka.jpg"
import {FaBed, FaUser} from "react-icons/fa";
import {MdKingBed} from "react-icons/md";
import {RiCoinsFill} from "react-icons/ri";
import {BsCheckCircle} from "react-icons/bs";


function SelectsImage(props) {
    const [isActive, setIsActive] = useState(false);
    const [status, setStatus] = useState(0)


    const setOrder = (e, order) =>{
        e.preventDefault()
        setIsActive(current => !current);

        setStatus({number: order.number, status: 1})

        localStorage.setItem("room", JSON.stringify(order))
    }



    return(
        <div className={style.room} onClick={e =>setOrder(e, props)}>
            <img src={props.bgImg} />
            {isActive==true?<span className={style.wybrany}><BsCheckCircle/></span>:null}
            <div className={style.overlay}>
                <p className={style.numerek}>{props.number}</p>
                <div className={style.description}>
                    <span><FaUser/> {props.acommodation}</span>
                    <span><FaBed/> {props.bed}</span>
                    <span><RiCoinsFill/> {props.price}zł*</span>
                </div>
            </div>
        </div>

    )
}
export default SelectsImage