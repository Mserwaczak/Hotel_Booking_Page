import style from"./SearchPageStyle.module.css"
import Element from"./Element"
import React, {useEffect, useState} from "react";
import axios from "axios";


function SearchPage(props) {

    const [offers, setOffers] = useState([])
    const [filter, setFilter] = useState([])
    const [destination, setDestination] = useState();
    const array = [1,2,3];
    const [value, setValue] = useState({city: "", data1: "", data2: ""})

    const myFunction = async () => {
        const val = JSON.parse(localStorage.getItem("val"))
        const response = await axios.get('http://localhost:4000/app/get-simple/' + val.city );

        setDestination(val.city)
        setOffers(response.data.simple)
    };

    const myFunction2 = async () => {
        const val = JSON.parse(localStorage.getItem("val"))
        var data1 = val.data1;
        var data2 = val.data2;
        const response = await axios.get('http://localhost:4000/app/get-simple/' + destination );

        localStorage.setItem("val",JSON.stringify({"city": destination, "data1": data1, "data2": data2}))

        setOffers(response.data.simple)
        console.log(offers)
    };

    const changeDestination = (e) => {
        setDestination(e.target.value)
        console.log(destination)
    };

    const filtrOffers = async (e) => {
        console.log(e.target.value);
        const val = JSON.parse(localStorage.getItem("val"))
        const response = await axios.get('http://localhost:4000/app/get-simple/' + val.city );

        const searchValue = e.target.value;
        let newFilter = filter;
        if (newFilter.includes(searchValue)){
            let id = newFilter.indexOf(searchValue)
            newFilter.splice(id,1)
        }else{
            newFilter.push(searchValue)
        }



        setFilter(newFilter)

        // console.log(filter)

        console.log(newFilter)

        const result = response.data.simple.filter(offer=>newFilter.includes(offer.type))
        console.log(result)
        setOffers(result)
    };

    useEffect(() => {
        myFunction();
    }, []);

    // function save(e, val) {
    //
    //     setDestination({...value, [val]:  e})
    //     console.log(value)
    //     console.log(e)
    // }
    //
    // function reload() {
    //     document.location.reload(true)
    // }

    return (
        <div>
            <div className={style.listContainer}>
                <div className={style.listWrapper}>
                    <div className={style.listSearch}>
                        <h1 className={style.lsTitle}>Szukaj</h1>
                        <div className={style.lsItem}>
                            <label> Miejscowość: </label>
                            <input placeholder={destination} onChange={changeDestination} type="text"/><br/>
                            <div className={style.check}>
                                <form>
                                <input type="checkbox" id="hotel" name="name" value="Hotel" onClick={filtrOffers}/>
                                <label htmlFor="hotel"> Hotele</label><br/>
                                <input type="checkbox" id="pensjonat" name="name" value="Pensjonat" onClick={filtrOffers}/>
                                <label htmlFor="pensjonat"> Pensjonaty</label><br/>
                                <input type="checkbox" id="domek" name="name" value="Domki" onClick={filtrOffers}/>
                                <label htmlFor="domek"> Domki</label><br/><br/>
                                </form>
                            </div>
                        </div>
                        <button className={style.searchListbtn} onClick={myFunction2}>Szukaj</button>
                    </div>
                    <div className={style.listResult}>
                        {offers?(offers.map((val)=>{
                            return <Element facility={val.facility} price={val.price} street={val.street} name={val.name} jpg1={val.jpg1} avgRating={val.avgRating}/>
                        })):null}
                    </div>
                </div>
            </div>

        </div>

        // <div className={style.xc}>
        //     <div className={style.xv}>
        //         {offers?(offers.map((val)=>{
        //             return <Element street={val.street} name={val.name} jpg1={val.jpg1} avgRating={val.avgRating}/>
        //         })):null}
        //
        //     </div>
        // </div>
    );
}

export default SearchPage;
