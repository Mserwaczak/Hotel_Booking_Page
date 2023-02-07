import React, {useState} from 'react'
import {BiSearch} from "react-icons/bi";
import {HiOutlineMenuAlt4} from "react-icons/hi";
import useAuth from "../../hooks/useAuth";

import "./NavbarStyles.css"
import {FaFacebook, FaInstagram, FaTwitter, FaYoutube} from "react-icons/fa";

import {Link} from "react-scroll"
import {NavLink} from "react-router-dom";

import {useNavigate} from "react-router-dom";

function Navbar(){
    const [auth, setAuth] = useAuth()
    const navigate = useNavigate()
    const [nav, setNav] = useState(false)
    const handleNav = () => setNav(!nav)

    const logout = (e) =>{
        e.preventDefault()
        setAuth(false)
        navigate("/")
    }

    return(
        <div className={nav ? "navbar navbar-bg" : "navbar"}>
            <div className="logo">
                <NavLink exact to="/"><h2>HOLIDAYS.</h2></NavLink>
            </div>
            <ul className="nav-menu">
                <Link to="movie" smooth={true} duration={500}><li>Home</li></Link>
                <Link to="selects" smooth={true} duration={500}><li>Miasta</li></Link>
                <Link to="carousel" smooth={true} duration={500}><li>Obiekty</li></Link>
                {auth?(<>
                    <NavLink exact to="/my-reservation"><li>@{auth.username}</li></NavLink>
                <NavLink onClick={logout} exact to="/"><li>Wyloguj</li></NavLink></>):(<>
                    <NavLink exact to="/login"><li>Zaloguj</li></NavLink>
                    <NavLink exact to="/register"><li>Zarejestruj</li></NavLink>
                </>)
                }
                {/*<NavLink exact to="login"><li>Zaloguj</li></NavLink>*/}
                {/*<NavLink exact to="register"><li>Zarejestruj</li></NavLink>*/}
            </ul>
            <div className="nav-icons">
                <BiSearch className="icon"/>
            </div>
            <div className="hamburger" onClick={handleNav}>
                <HiOutlineMenuAlt4 classname="icon"/>
            </div>

            <div className={nav ? "mobile-menu active"  : "mobile-menu"}>
                <ul className="mobile-nav">
                    <li>Home</li>
                    <li>Miasta</li>
                    <li>Obiekty</li>
                    {auth?(<>
                        <NavLink exact to="/my-reservation"><li>@{auth.username}</li></NavLink>
                        <NavLink onClick={logout} exact to="/"><li>Wyloguj</li></NavLink></>):(<>
                        <NavLink exact to="/login"><li>Zaloguj</li></NavLink>
                        <NavLink exact to="/register"><li>Zarejestruj</li></NavLink>
                    </>)
                    }
                </ul>
                <div className="mobile-menu-bottom">
                    <div className="menu-icons">
                        <button>Search</button>
                    </div>
                    <div className="social-icons">
                        <FaFacebook className="icon"/>
                        <FaInstagram className="icon"/>
                        <FaTwitter className="icon"/>
                        <FaYoutube className="icon"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar