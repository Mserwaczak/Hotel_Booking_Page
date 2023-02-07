import "./InfoStyle.css";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import {BiMap} from "react-icons/bi";
import {FaParking} from "react-icons/fa";
import {AiOutlineWifi} from "react-icons/ai";
import {MdOutlineFamilyRestroom} from "react-icons/md";
import {MdSmokeFree} from "react-icons/md";
import {IoIosFitness} from "react-icons/io";
import {BiDrink} from "react-icons/bi";
import {FaUser} from "react-icons/fa";
import {Carousel} from "react-responsive-carousel";
import hotel from "../../assets/hotel.jpg";
import domki from "../../assets/domki.jpg";
import pensjonat from "../../assets/pensjonat.jpg";
import style from "../SearchPage/SearchPageStyle.module.css";
import Element from "../SearchPage/Element";
import Room from "./Room";
import useAuth from "../../hooks/useAuth";



function Info(props) {
    const navigate = useNavigate();
    const [info, setInfo] = useState([])
    const [price, setPrice] = useState([])
    const [status, setStatus] = useState(0)
    const [auth, setAuth] = useAuth()
    // const [test, setTest] = useState([])

    const name = useParams()

    // console.log(name)
    const myFunction = async () => {
        var test = JSON.parse(localStorage.getItem("val"))
        var data1 = test.data1
        var data2 = test.data2

        // console.log(data1)
        // console.log(data2)
        // const response = await axios.get('http://localhost:4000/app/get-hotel/' + name.name );
        const response = await axios.get('http://localhost:4000/app/get-available/' + name.name + "/" + data1 + "/" + data2);
        // const response2 = await axios.get('http://localhost:4000/app/get-price/' + name.name );
        // console.log(response)
        // response.data.price()
        localStorage.setItem("hotel", JSON.stringify(name))
        setInfo(response.data.simple[0])
        // setPrice(response2.data.price)
    };
    // console.log(info)
    useEffect( ()=>{
        myFunction();
    }, [])

    // console.log(info.facilities)

    const setOrder = (e, order) =>{
        e.preventDefault()
        setStatus({number: order.number, status: 1})

        localStorage.setItem("room", JSON.stringify(order))

        console.log(order)
    }

    return (
        <div>
            <div className="listContainer">
                <div className="listWrapper">
                    <div className="info">
                        <h1 className="name">{info.name}</h1>
                        <div className="description">
                            <span className="street"><BiMap/> {info.street}</span>
                            <span className="titles"> Opis </span>
                            <span className="summary">{info.description} </span>
                            <span className="titles"> Udogodnienia </span>
                            <span className="facilities">
                              {info.facilities?(info.facilities.map((key)=> {return <p>+ {key}</p> })): "xD"}
                            </span>
                        </div>
                    </div>
                    <div className="foto">
                        <div id="carousel" className="container2">
                            <Carousel className='carousel2' showArrows={true} autoPlay={true} infiniteLoop={true} >
                                <div>
                                    <img src={info.jpg1} alt='/' />
                                    {/*<p className="legend">Hotele</p>*/}
                                </div>
                                <div>
                                    <img src={info.jpg2} alt='/' />
                                    {/*<p className="legend">Domki</p>*/}
                                </div>
                                <div>
                                    <img src={info.jpg3} alt='/' />
                                    {/*<p className="legend">Pensjonaty</p>*/}
                                </div>
                                <div>
                                    <img src={info.jpg4} alt='/' />
                                    {/*<p className="legend">Pensjonaty</p>*/}
                                </div>
                            </Carousel>
                        </div>
                    </div>
                </div>

            </div>
            <div className="freeroom">
                <div className="text6"><span className="titles"> Wolne pokoje </span></div>
                <div className="pokoje">
                    {info.rooms?(info.rooms.map((val)=>{
                        return <Room bgImg={info.jpg2} number={val.number} acommodation={val.accomodation} bed={val.bed} price={val.price}/>
                    })):null}
                    <p className="wytlumaczenie">* podana cena jest ceną za dobę</p>
                </div>

            </div>
            <div className="przycisk">
                {auth?(<NavLink exact to="/reservation-form"><button className="but">Złóż zamówienie</button></NavLink>):(<NavLink exact to="/login"><button className="but">Zaloguj żeby złożyć zamówienie</button></NavLink>)}
            </div>



        </div>
    );
}

export default Info;
