import style from "./ReservationStyle.module.css";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import {BiBed, BiMap} from "react-icons/bi";
import {FaParking} from "react-icons/fa";
import {AiOutlineUser, AiOutlineWifi} from "react-icons/ai";
import {MdOutlineFamilyRestroom} from "react-icons/md";
import {MdSmokeFree} from "react-icons/md";
import {IoIosFitness} from "react-icons/io";
import {BiDrink} from "react-icons/bi";
import {FaUser} from "react-icons/fa";
import {Carousel} from "react-responsive-carousel";
import hotel from "../../assets/hotel.jpg";
import domki from "../../assets/domki.jpg";
import pensjonat from "../../assets/pensjonat.jpg";



function ReservationForm(props) {
    const navigate = useNavigate();
    const [info, setInfo] = useState([])
    const [room, setRoom] = useState([])
    const [date, setDate] = useState([])
    const [hotel, setHotel] = useState([])
    const [price, setPrice] = useState([])
    const [days, setDays] = useState()
    const [user, setUser] = useState([])
    const [status, setStatus] = useState(0)
    // const [test, setTest] = useState([])

    const name = useParams()

    // console.log(name)
    const myFunction = async () => {
        var test = JSON.parse(localStorage.getItem("val"))
        var test2 = JSON.parse(localStorage.getItem("user"))
        var room2 = JSON.parse(localStorage.getItem("room"))
        var hotel2 = JSON.parse(localStorage.getItem("hotel"))
        var username = test2.username

        console.log(test2)

        const response = await axios.get('http://localhost:4000/app/get-user-details/' + username);
        console.log(response.data.simple[0])

        var data1 = new Date(test.data1)
        var data2 = new Date(test.data2)
        var Difference_In_Time = data2.getTime() - data1.getTime();
        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

        setInfo(response.data.simple[0])
        setDate(test)
        setRoom(room2)
        setHotel(hotel2)
        setUser(test2)

        var summary = Difference_In_Days * room2.price

        // console.log(summary)
        setDays({"summary": summary, "dni": Difference_In_Days})

        console.log(days)
        // setPrice(response2.data.price)
    };
    // console.log(info)
    useEffect( ()=>{
        myFunction();
    }, [])

    // console.log(room.number)

    const handleSubmit = async (e) =>{
        e.preventDefault()
        const reservations = {
            name: hotel.name,
            user: user.username,
            username: user.username,
            roomNumber: room.number,
            from: date.data1,
            to: date.data2,
            bedNumber: room.bed,
            cost: days.summary
        }

        axios.post('http://localhost:4000/app/reserve', reservations)
            .then(response => console.log(response.data))

        window.location = '/thanks'

    }

    return (
        <div className={style.container}>
            <div className={style.wrapper}>
                <h1 className={style.title2}>Podsumowanie</h1>
                <div className={style.top}>
                    <button onClick={handleSubmit} className={style.topButton2}>ZAMAWIAM</button>
                </div>
                <div className={style.bottom}>
                    <div className={style.info}>
                        <div className={style.hotel}>
                            <div className={style.hotelDetail}>
                                <img className={style.hoteljpg} src={room.bgImg}/>
                                <div className={style.desc}>
                                    <span className={style.name}><b>imię:</b> {info.name}</span>
                                    <span className={style.name}><b>nazwisko:</b> {info.surname}</span>
                                    <span className={style.name}><b>email:</b> {info.email}</span>
                                    <span className={style.name}><b>hotel:</b> {hotel.name}</span>
                                    <span className={style.name}><b>Pokój nr:</b> {room.number}</span>
                                    <span className={style.name}><BiBed/>x{room.bed} <AiOutlineUser/>x{room.acommodation}</span>
                                </div>

                            </div>

                        </div>
                        <div className={style.nav}>
                            <NavLink  exact to={"/"}><button className={style.topButton1}>REZYGNUJE</button></NavLink>
                        </div>

                    </div>
                    <div className={style.summary}>
                        <h1 className={style.summaryTitle}>Do zapłaty</h1>
                        <div className={style.summaryItem}>
                            <span className={style.summaryItemText}>Za dobę</span>
                            <span className={style.summaryItemPrice}>{room.price}zł</span>
                        </div>
                        <div className={style.summaryItem}>
                            <span className={style.summaryItemText}>Od</span>
                            <span className={style.summaryItemPrice}>{date.data1}</span>
                        </div>
                        <div className={style.summaryItem}>
                            <span className={style.summaryItemText}>Do</span>
                            <span className={style.summaryItemPrice}>{date.data2}</span>
                        </div>
                        <div className={style.summaryItem}>
                            <span className={style.summaryItemText}>Dni</span>
                            {days?(<span className={style.summaryItemPrice}> {days.dni}</span>):null}
                        </div>
                        <div className={style.summaryItem}>
                            <span className={style.total}>W sumie</span>
                            {days?(<span className={style.total}> {days.summary}zł</span>):null}
                        </div>
                    </div>
                </div>
            </div>

        </div>
        // <div className={style.xc}>
        //     <div className={style.xv}>
        //         <h1 className={style.title}>Podsumowanie</h1>
        //         <h3>imię: {info.name}, nazwisko: {info.surname}</h3>
        //         <h3>email: {info.email}</h3>
        //         <h3>hotel: {hotel.name}</h3>
        //         <h3>Pokój nr: {room.number}</h3>
        //         <h5><BiBed/>x{room.bed} <AiOutlineUser/>x{room.accomodation}</h5>
        //         <h3>Cena za dobę: {room.price}zł</h3>
        //         <h3>Od: {date.data1}, Do: {date.data2}</h3>
        //         {days?(<h3>Łącznie do zapłaty: {days.summary}zł</h3>):null}
        //         <div className={style.przyciski}>
        //             <NavLink exact to={"/"}><button className={style.resign}>Rezygnuję</button></NavLink>
        //             <button onClick={handleSubmit} className={style.buy}>Zamawiam</button>
        //         </div>
        //
        //
        //     </div>
        // </div>
    );
}

export default ReservationForm;
