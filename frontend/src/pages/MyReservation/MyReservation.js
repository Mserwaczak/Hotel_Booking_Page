import style from"./MyReservationStyle.module.css"
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import {BiBed, BiMap} from "react-icons/bi";
import {Carousel} from "react-responsive-carousel";
import {IoBedSharp} from "react-icons/io";


function MyReservation(props) {
    const navigate = useNavigate();
    const [info, setInfo] = useState([])
    const [price, setPrice] = useState([])
    const [show, setShow] = useState()
    const [response, setResponse] = useState()
    const [ocena, setOcena] = useState({})
    // const [test, setTest] = useState([])

    const name = useParams()

    // console.log(name)
    const myFunction = async () => {
        var test = JSON.parse(localStorage.getItem("user"))
        var username = test.username

        const response = await axios.get('http://localhost:4000/app/get-my-reservation/' + username);
        const response2 = await axios.get('http://localhost:4000/app/get-my-vote/' + username);
        if(response.data.reservation.myVote != 0){
            response.data.reservation.vote = response2.data.test
        }


        console.log(response)
        // response.data.price()
        setInfo(response.data.reservation)
        // setPrice(response2.data.price)
    };
    console.log(info)
    useEffect( ()=>{
        myFunction();
    }, [])

    const funkcja = (e, id) =>{
        e.preventDefault()
        setShow(id)
    }

    const rate = (e, number) =>{
        console.log(e.target.value, number)
        setOcena({...ocena, [number]:e.target.value})
        console.log(ocena)
    }

    const handleSubmit = async (e, key) =>{

        const res = await axios.put('http://localhost:4000/app/rate', {name: key.name,rate: ocena[key._id] ,id: key._id  } );

        if(res.data.message == "ok"){
            setShow(false)
            setResponse(res.data.message)
        }

        window.location.reload(true)


    }

    return (
        <div className={style.xc}>
            <div className={style.xv}>
                {/*<h1>{info.details[0]}</h1>*/}
                {/*{info?(info[0]?(info[0].details.map((key)=>{*/}
                {/*    return(*/}
                {/*        <h1>{key.name} {key.surname}</h1>*/}
                {/*        )*/}
                {/*})):null):null}*/}
                <h2>MOJE REZERWACJE</h2>
                <table>
                    <tr>
                        <th>Hotel</th>
                        <th>Pokój</th>
                        <th>Od</th>
                        <th>Do</th>
                        <th>Do zapłaty</th>
                        <th>Status</th>
                        <th>Moja ocena</th>
                    </tr>
                    {info?(info.map((key, index)=>{
                        return(<>
                            <tr>
                                <td>{key.name}</td>
                                <td>Numer: {key.roomNumber}, <BiBed/>x{key.bedNumber} </td>
                                <td>{key.from.substring(0,10)}</td>
                                <td>{key.to.substring(0,10)}</td>
                                <td>{key.cost}</td>
                                <td>{key.status}</td>
                                {info.vote[index].myVote != 0?(ocena[key._id]?ocena[key._id]:info.vote[index].myVote):(<button className={style.btn} disabled={(key.status=="Zarezerwowany"||key.status=="Zameldowany")?true:false} onClick={e=>funkcja(e,key._id)}>Oceń</button>)}
                            </tr>
                                <tr>
                                    <td colSpan="6">
                            {show==key._id?(<div className={style.rating}>
                                <div className={style.radio}>
                                <label><input type="radio" name="grupa1" value="1"  onChange={e=>rate(e, key._id)}/>1</label>
                            <label><input type="radio" name="grupa1" value="2" onChange={e=>rate(e, key._id)}/>2</label>
                            <label><input type="radio" name="grupa1" value="3" onChange={e=>rate(e, key._id)}/>3</label>
                                <label><input type="radio" name="grupa1" value="4" onChange={e=>rate(e, key._id)}/>4</label>
                                <label><input type="radio" name="grupa1" value="5" onChange={e=>rate(e, key._id)}/>5</label>
                            <label><input type="radio" name="grupa1" value="6" onChange={e=>rate(e, key._id)}/>6</label>
                                <label><input type="radio" name="grupa1" value="7" onChange={e=>rate(e, key._id)}/>7</label>
                                <label><input type="radio" name="grupa1" value="8" onChange={e=>rate(e, key._id)}/>8</label>
                                <label><input type="radio" name="grupa1" value="9" onChange={e=>rate(e, key._id)}/>9</label>
                                <label><input type="radio" name="grupa1" value="10" onChange={e=>rate(e, key._id)}/>10</label>
                                </div>
                                <button className={style.ratebtn} onClick={e=>handleSubmit(e,key)}>Oceń</button>
                            </div>):null}</td></tr></>
                        )
                    })):null}

                </table>

            </div>
        </div>
    );
}

export default MyReservation;
