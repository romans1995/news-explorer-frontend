import logo from "../../images/logo.png";
import blackLogo from "../../images/blackLogo.svg";
import React, { useEffect, useState } from "react";
import nav1 from "../../images/header/Rectangle1.png"
import nav2 from "../../images/header/Rectangle2.png"
import { Navigate, NavLink, useLocation } from 'react-router-dom';
import { usePopup } from '../../contexts/PopupContext';
import { useAuth } from '../../contexts/AuthContext';

import exitImg from '../../images/icons/logout.svg'
import exitImgdark from '../../images/icons/logout-dark.svg'

function Header() {
    const [isHome, setIsHome] = useState(true);
    const location = useLocation();

    const { openPopup, closeAllPopups } = usePopup();
    const elemntClass = document.getElementsByClassName("header__navburger");
    const liClass = document.querySelectorAll(".header__button");
    const { loggedIn, user, handleLogout } = useAuth();
    const navBurgerChange = () => {
        if (!elemntClass[0].classList.contains('open')) {
            elemntClass[0].classList.add('open');
        } else {
            elemntClass[0].classList.remove('open');
            closeAllPopups();
        }
    };
    const openSignin = () => {
        openPopup('signin');

    }
    useEffect(() => {
        location.pathname !== '/' ? setIsHome(false) : setIsHome(true);
        isHome ? liClass.forEach(li => (li.classList.add('li__active-white'))) : liClass.forEach(li => (li.classList.add('li__active-dark')));
        console.log(liClass)
    }, [location, isHome, liClass]);
    return (
        <header className={isHome ? "header" : "header white-bg "} >
            <div className="header_wrap">
                <img src={isHome ? logo : blackLogo} alt="Logo" className="header__logo" />
                <ul className="header__div">
                    {loggedIn ?

                        <><li onClick={() => handleLogout()} className={isHome ? "header__link header__button" : "header__link header__button-dark"} >{user.firstName}<img className={isHome?"header__button-image":"header__button-image-dark"} src={exitImg}  alt="Log out" /></li>
                            <NavLink to="/saved-news" end className={isHome ? "header__link header__button li__active-white " : "header__link header__button selected-dark"}>saved news</NavLink>
                            <li><NavLink className={isHome ? "header__link header__button li__active-white selected" : "header__link header__button "} to="/" end>
                                Home
                            </NavLink></li></>
                        :
                        <> <li onClick={() => openPopup('signin')} className="header__link header__button" elemnt={<Navigate replace to="/signin" />}>Sign in</li>
                            <li className="header__home header__button selected"><NavLink to="/" end>
                                Home
                            </NavLink></li></>}

                </ul>


                <div className={`header__navburger`} onClick={() => { openPopup('nav'); navBurgerChange() }}>
                    <img className="nav1" src={nav1} alt="" />
                    <img className="nav2" src={nav2} alt="" />
                </div>
            </div>
        </header>
    );
}

export default Header;