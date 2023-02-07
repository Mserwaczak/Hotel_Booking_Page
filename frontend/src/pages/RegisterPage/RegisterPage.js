import style from "./RegisterPageStyle.module.css";
import {NavLink} from "react-router-dom";
import {FaRegUserCircle} from "react-icons/fa";
import {AiFillLock} from "react-icons/ai";
import {BiUser} from "react-icons/bi";
import {MdOutlineAlternateEmail} from "react-icons/md";
import axios from 'axios'
import {useRef, useState, useEffect} from "react";
import {faCheck, faTimes, faInfoCircle} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const USER_REGEX = /^[a-zA-Z][a-zA-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX =   /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;

function RegisterPage(props) {
    const userRef= useRef();
    const errRef = useRef()

    const [name, setName] = useState('');

    const [surname, setSurname] = useState('');

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('')
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('')
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [email, setEmail] = useState('')
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('')
    const [success, setSuccess] = useState(false);

    useEffect(() =>{
        userRef.current.focus();
    }, [])

    useEffect(()=>{
        const result = USER_REGEX.test(user);
        console.log(result);
        console.log(user);
        setValidName(result);
    }, [user])

    useEffect(()=>{
        const result = PWD_REGEX.test(pwd);
        console.log(result);
        console.log(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd])

    useEffect(()=>{
        const result = EMAIL_REGEX.test(email);
        console.log(result);
        console.log(email);
        setValidEmail(result);
    }, [email])

    useEffect(()=>{
        setErrMsg('');
    }, [user, pwd, matchPwd])

    const handleSubmit = async (e) =>{
        e.preventDefault()
        try {
            const registered = {
                name: name,
                surname: surname,
                username: user,
                email: email,
                password: pwd
            }

            const response = await axios.post('http://localhost:4000/app/register', registered);

            if (response.data.status === 'ok'){
                window.location = '/thank-register'
            }

        }catch(err){
            if(!err?.response){
                setErrMsg('No server response')
            }else if (err.response?.status === 401){
                setErrMsg('Nazwa użytkownika jest już zajęta')
            }else if (err.response?.status === 400){
                setErrMsg('Adres email już w użyciu')
            }
            errRef.current.focus();
        }



    }

    return (
                <div className={style.xc}>
                    <div className={style.sect}>
                        <p ref={errRef} className={errMsg ? style.errmsg : style.offscreen} aria-live="assertive">{errMsg}</p>
                        <h1 className={style.registerTitle}>Zarejestruj</h1>
                        <form className={style.formularz} onSubmit={handleSubmit}>
                            <label htmlFor="name" className={style.labels}>
                                <BiUser/>Imię:
                            </label>
                            <input
                                className={style.inputs}
                                type="text"
                                id="name"
                                autoComplete="off"
                                onChange={(e) => setName(e.target.value)}
                                required
                            />

                            <label htmlFor="surname" className={style.labels}>
                                <BiUser/>Nazwisko:
                            </label>
                            <input
                                className={style.inputs}
                                type="text"
                                id="surname"
                                autoComplete="off"
                                onChange={(e) => setSurname(e.target.value)}
                                required
                            />

                            <label htmlFor="username" className={style.labels}>
                                <FaRegUserCircle/>Username:
                                <span className={validName ? style.valid : style.hide}>
                            <FontAwesomeIcon icon={faCheck} />
                        </span>
                                <span className={validName || !user ? style.hide : style.invalid}>
                            <FontAwesomeIcon icon={faTimes}/>
                        </span>
                            </label>
                            <input
                                className={style.inputs}
                                type="text"
                                id="username"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setUser(e.target.value)}
                                required
                                aria-invalid={validName ? "false" : "true"}
                                aria-describedby="uidnote"
                                onFocus={() => setUserFocus(true)}
                                onBlur={() => setUserFocus(false)}
                            />
                            <p id="uidnote" className={userFocus && user && !validName ? style.instructions : style.offscreen}>
                                <FontAwesomeIcon icon={faInfoCircle}/>
                                4 do 24 znaków.<br />
                                Musi zaczynać się od litery.<br />
                                Litery, liczby, podkreślenia i myślniki dozwolone.
                            </p>

                            <label htmlFor="email" className={style.labels}>
                                <MdOutlineAlternateEmail/>Email:
                                <span className={validEmail ? style.valid : style.hide}>
                            <FontAwesomeIcon icon={faCheck} />
                        </span>
                                <span className={validEmail || !email ? style.hide : style.invalid}>
                            <FontAwesomeIcon icon={faTimes}/>
                        </span>
                            </label>
                            <input
                                className={style.inputs}
                                type="text"
                                id="email"
                                autoComplete="off"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                aria-invalid={validEmail ? "false" : "true"}
                                aria-describedby="emailnote"
                                onFocus={() => setEmailFocus(true)}
                                onBlur={() => setEmailFocus(false)}
                            />
                            <p id="emailnote" className={emailFocus && email && !validEmail ? style.instructions : style.offscreen}>
                                <FontAwesomeIcon icon={faInfoCircle}/>
                                Wprowadź poprawny adres email
                            </p>

                            <label htmlFor="password" className={style.labels}>
                                <AiFillLock/>Hasło:
                                <span className={validPwd ? style.valid : style.hide}>
                            <FontAwesomeIcon icon={faCheck} />
                        </span>
                                <span className={validPwd || !pwd ? style.hide : style.invalid}>
                            <FontAwesomeIcon icon={faTimes}/>
                        </span>
                            </label>
                            <input
                                className={style.inputs}
                                type="password"
                                id="password"
                                onChange={(e) => setPwd(e.target.value)}
                                required
                                aria-invalid={validPwd ? "false" : "true"}
                                aria-describedby="pwdnote"
                                onFocus={() => setPwdFocus(true)}
                                onBlur={() => setPwdFocus(false)}
                            />
                            <p id="pwdnote" className={pwdFocus && !validPwd ? style.instructions : style.offscreen}>
                                <FontAwesomeIcon icon={faInfoCircle}/>
                                8 do 24 znaków.<br />
                                Musi zawierać wielkie i małe litery, cyfrę i znak specjalny.<br />
                                Dozwolone znaki specjalne: <span aria-label="exclamation mark">!</span>
                                <span aria-label="at symbol">@</span><span aria-label="hashtag">#</span>
                                <span aria-label="dollar sign">$</span><span aria-label="percent">%</span>
                            </p>

                            <label htmlFor="confirm_pwd" className={style.labels}>
                                <AiFillLock/>Potwierdź hasło:
                                <span className={validMatch && matchPwd ? style.valid : style.hide}>
                            <FontAwesomeIcon icon={faCheck} />
                        </span>
                                <span className={validMatch || !matchPwd ? style.hide : style.invalid}>
                            <FontAwesomeIcon icon={faTimes}/>
                        </span>
                            </label>
                            <input
                                className={style.inputs}
                                type="password"
                                id="confirm_pwd"
                                onChange={(e) => setMatchPwd(e.target.value)}
                                required
                                aria-invalid={validPwd ? "false" : "true"}
                                aria-describedby="confirmnote"
                                onFocus={() => setMatchFocus(true)}
                                onBlur={() => setMatchFocus(false)}
                            />
                            <p id="confirmnote" className={matchFocus && !validMatch ? style.instructions : style.offscreen}>
                                <FontAwesomeIcon icon={faInfoCircle}/>
                                Wpisane hasła muszą być identyczne
                            </p>

                            <button className={style.przycisk} disabled={!validName || !validPwd || !validMatch || !validEmail}>Zarejestruj</button>
                            <p>
                                Masz już konto?
                                <span className={style.line}>
                            <NavLink exact to="/login">  Zaloguj</NavLink>
                        </span>
                            </p>

                        </form>
                    </div>
                </div>
            )
}

export default RegisterPage;