import React from 'react'
import Navbar from "./components/navbar/Navbar";
import Hero from "./components/hero/Hero";
import MainPage from "./pages/MainPage/MainPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {useReducer} from "react";
import {InitialState, Reducer} from "./Reducer";
import {AuthContext} from "./hooks/useAuth";
import {ReducerContext} from "./context/Context";
import Layout from "./components/layout/Layout";
import Footer from "./components/footer/Footer";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import SearchPage from "./pages/SearchPage/SearchPage";
import Info from "./pages/Info/Info";
import MyReservation from "./pages/MyReservation/MyReservation";
import ReservationForm from "./pages/ReservationForm/ReservationForm";
import ThanksPage from "./pages/ThanksPage/ThanksPage";
import ThankRegisterPage from "./pages/ThankRegisterPage/ThankRegisterPage";
import Admin from "./pages/Admin/Admin";

function App() {
    const [state, dispatch] = useReducer(Reducer, InitialState);
    const header = <Navbar/>
    const footer = <Footer/>
    const content = (
          <Routes>
              <Route exact path="/register" element={<RegisterPage />} />
              <Route exact path="/login" element={<LoginPage />} />
              <Route exact path="/search" element={<SearchPage />} />
              {/*<Route exact path="/hotele" element={<Hotele />} />*/}
              {/*<Route exact path="/domki" element={<Domki />} />*/}
              {/*<Route exact path="/pensjonaty" element={<Pensjonaty />} />*/}
              <Route exact path="/info/:name" element={<Info />} />
              <Route exact path="/my-reservation" element={<MyReservation />} />
              <Route exact path="/reservation-form" element={<ReservationForm />} />
              <Route exact path="/thanks" element={<ThanksPage />} />
              <Route exact path="/thank-register" element={<ThankRegisterPage />} />
              <Route exact path="/admin" element={<Admin />} />

              <Route exact path="/" element={<MainPage />} />
          </Routes>
          );

    return (
        <Router>
            <AuthContext.Provider
                value={{
                    user: state.user,
                    isAuthenticated: state.isAuthenticated,
                    login: (user) => dispatch({ type: "login", user }),
                    logout: () => dispatch({ type: "logout" }),
                }}
            >
                <ReducerContext.Provider
                    value={{
                        state: state,
                        dispatch: dispatch,
                    }}
                ><Layout header={header} footer={footer} content={content} />  </ReducerContext.Provider>
            </AuthContext.Provider></Router>
    );
}

export default App;
