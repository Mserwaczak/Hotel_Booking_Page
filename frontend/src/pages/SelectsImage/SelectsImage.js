import React, {useState} from "react"
import  "./SelectImagesStyle.css"

import  Video from "../../assets/maldivesVideo.mp4"
import useAuth from "../../hooks/useAuth";
import {AiOutlineSearch} from "react-icons/ai";

import krakow from "../../assets/krakow.jpg"
import wroclaw from "../../assets/wroclaw.jpg"
import gdansk from "../../assets/gdansk.jpg"
import warszawka from "../../assets/warszawka.jpg"

function SelectsImage(props) {


    return(
            <div className="selects-location">
                <img src={props.bgImg}/>
                <div className="overlay">
                    <p>{props.text}</p>
                </div>
            </div>

    )
}
export default SelectsImage