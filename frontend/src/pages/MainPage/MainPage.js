import React, {useState} from "react"
import  "./MainPageStyle.css"

import  Video from "../../assets/maldivesVideo.mp4"
import useAuth from "../../hooks/useAuth";
import {AiOutlineSearch} from "react-icons/ai";

import krakow from "../../assets/krakow.jpg"
import miasto from "../../assets/miasto.jpg"
import wroclaw from "../../assets/wroclaw.jpg"
import gdansk from "../../assets/gdansk.jpg"
import warszawka from "../../assets/warszawka.jpg"
import hotel from "../../assets/hotel.jpg"
import domki from "../../assets/domki.jpg"
import pensjonat from "../../assets/pensjonat.jpg"
import SelectsImage from "../SelectsImage/SelectsImage";
import {Carousel} from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"





function MainPage() {
    const [auth, setAuth] = useAuth()
    const [selectedDate, setSelectedDate] = useState(null)
    const [selectedDate2, setSelectedDate2] = useState(null)
    const [value, setValue] = useState({city: "", data1: "", data2: ""})
    const [sprawdzacz, setSprawdzacz] = useState(true)


    var today = new Date()
    var month = null;
    if(today.getMonth()+1 <10){
        month = '0'+(today.getMonth()+1)
    }else{
        month = today.getMonth()+1
    }

    console.log(month)
    var date = today.getFullYear()+'-'+(month)+'-'+today.getDate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        localStorage.setItem("val", JSON.stringify(value))
        window.location = '/search'

    }

    function save(e, val) {

        setValue({...value, [val]:  e})
        console.log(value)
        console.log(e)
    }

    return(
        <div className="main">
            <div id="movie" className="hero">
                {/*<video autoPlay loop muted id="video">*/}
                {/*    <source src={Video} type="video/mp4"/>*/}
                {/*</video>*/}
                <img src={miasto}/>
                <div className="content">
                    <h1 className="title">Najlepsze miejsca na wypoczynek</h1>
                    <form className="form" onSubmit={handleSubmit} >
                        <div>
                            <input required type="text" placeholder="Miejscowość" onChange={e => save(e.target.value, "city")}/>
                        </div>
                        <div>
                            <label for="od">Od:</label><input required type="date" id="od" min={date} onChange={e => save(e.target.value, "data1")}/>
                        </div>
                        <div>
                            <label htmlFor="do">Do:</label><input required type="date"  id="do" min={value.data1} onChange={e => save(e.target.value, "data2")}/>
                        </div>
                        <div>
                            <button><AiOutlineSearch className="icon"/></button>
                        </div>
                    </form>
                </div>
            </div>
            <div id="selects" className="selects">
                <h1 className="title">Najlepsze miejsca na wypoczynek</h1>
                <p>Najpiękniejsze polskie miejscowości</p>
                <div className="container">
                    <SelectsImage  bgImg={krakow} text={"Kraków"}/>
                    <SelectsImage  bgImg={wroclaw} text={"Wrocław"}/>
                    <SelectsImage  bgImg={gdansk} text={"Gdańsk"}/>
                    <SelectsImage  bgImg={warszawka} text={"Warszawa"}/>
                </div>
            </div>
            <div id="carousel" className="container">
                <h1>Proponowane typy obiektów</h1>
                <Carousel className='carousel' showArrows={true} autoPlay={true} infiniteLoop={true} >
                    <div>
                        <img src={hotel} alt='/' />
                        <p className="legend">Hotele</p>
                    </div>
                    <div>
                        <img src={domki} alt='/' />
                        <p className="legend">Domki</p>
                    </div>
                    <div>
                        <img src={pensjonat} alt='/' />
                        <p className="legend">Pensjonaty</p>
                    </div>
            </Carousel>
            </div>
        </div>

    )
}
export default MainPage