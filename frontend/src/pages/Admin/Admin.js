import style from"./Admin.module.css"
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import {BiBed, BiMap} from "react-icons/bi";
import {Carousel} from "react-responsive-carousel";
import {IoBedSharp} from "react-icons/io";



function Admin(props) {

    const [reservation, setReservation] = useState([])

    const myFunction = async () => {
        const response = await axios.get('http://localhost:4000/app/get-all-reservation');

        setReservation(response.data.reservation)
        console.log(response.data.reservation)
        // setPrice(response2.data.price)
    };
    // console.log(info)
    useEffect( ()=>{
        myFunction();
    }, [])

    function handleSubmit(e, key) {
        
    }

    async function changeStatus(e, _id) {
        console.log(e.target.value, _id)

        const response = await axios.put('http://localhost:4000/app/change-status', {id: _id, status: e.target.value});
        window.location.reload(true)
    }

    async function deleteReservation(e, _id) {
        e.preventDefault()
        console.log(_id)
        const response = await axios.delete('http://localhost:4000/app/delete-reservation/' + _id);
        console.log(response)
        window.location.reload(true)
    }

    return (
        <div className={style.xc}>
            <div className={style.xv}>
                <table>
                    <tr>
                        <th>Użytkownik</th>
                        <th>Hotel</th>
                        <th>Pokój</th>
                        <th>Od</th>
                        <th>Do</th>
                        <th>Do zapłaty</th>
                        <th>Status</th>
                        <th>Zmień status</th>
                        <th>Usuń</th>
                    </tr>
                    {reservation?(reservation.map((key, index)=>{
                        return(<>
                                <tr>
                                    <td>{key.user}</td>
                                    <td>{key.name}</td>
                                    <td>Numer: {key.roomNumber}, <BiBed/>x{key.bedNumber} </td>
                                    <td>{key.from.substring(0,10)}</td>
                                    <td>{key.to.substring(0,10)}</td>
                                    <td>{key.cost}</td>
                                    <td>{key.status}</td>
                                    <td>
                                        <select name="status" id="status" onChange={e => changeStatus(e, key._id)}>
                                            <option selected={"Zarezerwowany"==key.status?true:false} value="Zarezerwowany">Zarezerwowany</option>
                                            <option selected={"Zameldowany"==key.status?true:false} value="Zameldowany">Zameldowany</option>
                                            <option selected={"Wymeldowany"==key.status?true:false}>Wymeldowany</option>
                                        </select>
                                    </td>
                                    <td><button onClick={e => deleteReservation(e, key._id)} className={style.przycisk}>X</button></td>
                                </tr></>
                        )
                    })):null}

                </table>

            </div>
        </div>
    );
}

export default Admin;
