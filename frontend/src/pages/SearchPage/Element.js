import style from "./SearchPageStyle.module.css"
import React, {useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {BiMap} from "react-icons/bi";


function Element(props) {
    const navigate = useNavigate();

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     ('/info', {replace: false})
    //
    //
    //
    // }
    console.log(props)
    return (
        <div className={style.searchItem}>
            <img className={style.searchItemjpg} src={props.jpg1}/>

            <div className={style.description}>
                <h1 className={style.siTitle}>{props.name}</h1>
                <span className={style.siStreet}><BiMap/>{props.street}</span>
                <span className={style.siFacility}>{props.facility}</span>
                <span className={style.siSubtitle}>Najlepsze miejsca na wypoczynek</span>
                <span className={style.siFeatures}>Serdecznie polecamy</span>
                <span className={style.siText}>Nie czekaj</span>
                <span className={style.siText2}>Sprawdź szczegóły</span>

            </div>
            <div className={style.details}>
                <div className={style.siRating}>
                    <span>Ocena:</span>
                    <button className={style.ratingbtn}>{Math.round(props.avgRating*10)/10}</button>
                </div>
                <div className={style.siDetailText}>
                    <span className={style.siPrice}>Od {props.price}zł</span>
                    <span className={style.siTax}>W tym VAT</span>
                    <Link to={`/info/${props.name}`}><button className={style.checkbutton}>Sprawdź szczegóły</button></Link>
                </div>
            </div>

        </div>
        // <div className={style.searchOne}>
        //     <img className={style.img1} src={props.jpg1} />
        //     <h3>{props.name}</h3>
        //     <p><BiMap/> {props.street}</p>
        //     <div className={style.okienko}>
        //         <Link to={`/info/${props.name}`}><button className={style.button1}>  Sprawdź </button></Link>
        //         <div className={style.ocena}>
        //             {Math.round(props.avgRating*100)/100}
        //         </div>
        //     </div>
        //
        // </div>

    );
}

export default Element;
