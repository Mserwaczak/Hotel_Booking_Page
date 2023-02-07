import style from "./LoginPageStyle.module.css";
import {useRef, useState, useEffect, useContext} from 'react';
import useAuth from "../../hooks/useAuth";
import {Link, NavLink, useNavigate, useLocation} from "react-router-dom";
import {FaRegUserCircle} from "react-icons/fa";
import {AiFillLock} from "react-icons/ai";
import axios from "axios";

function LoginPage(props) {
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('')
    const [errMsg, setErrMsg] = useState('');
    const [status, setStatus] = useState('');


    useEffect(()=>{
        userRef.current.focus();
    }, [])

    useEffect(()=>{
        setErrMsg();
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const login = {
                username: user,
                password: pwd
            }
            const response = await axios.post('http://localhost:4000/app/login', login);


            setUser('');
            setPwd('')
            console.log(response.status)
            if (response.data.status === 'ok'){
                console.log(response.data.username)
                setAuth({
                    username: response.data.username,
                    id: response.data.id
                });
                console.log('tets')
                if(user == "admin"){
                    navigate('/admin')
                }else{
                    navigate('/')
                }

            }


        }catch (err){
            if(!err?.response){
                setErrMsg('No server response')
            }else if (err.response?.status === 400 || err.response?.status === 401){
                setErrMsg('Błędny użytkownik lub hasło')
            }
            errRef.current.focus();
        }

    }

    return (
        <div className={style.xc}>
            <div className={style.sect}>
                <p ref={errRef} className={errMsg ? style.errmsg : style.offscreen} aria-live="assertive">{errMsg}</p>
                <h1 className={style.loginTitle}>Zaloguj</h1>
                <form className={style.formularz} onSubmit={handleSubmit}>
                    <label htmlFor="username"> <FaRegUserCircle/>Username: </label>
                    <input
                        className={style.inputs}
                        type="text"
                        id="username"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setUser(e.target.value)}
                        value={user}
                        required
                    />

                    <label htmlFor="password"><AiFillLock/>Hasło:</label>
                    <input
                        className={style.inputs}
                        type="password"
                        id="password"
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        required
                    />
                    <button className={style.przycisk}>Zaloguj</button>
                </form>
                <p>Chcesz założyć konto? <br/>
                    <span className={style.line}>
                        <NavLink exact to="/register">Zarejestruj się</NavLink>
                    </span>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;