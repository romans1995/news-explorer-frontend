import logo from "../../images/logo.png";
import React from "react";
import nav1 from "../../images/header/Rectangle1.png"
import nav2 from "../../images/header/Rectangle2.png"
import { Navigate } from 'react-router-dom';
import { usePopup } from '../../contexts/PopupContext';
import { useAuth } from '../../contexts/AuthContext';

import exitImg from '../../images/icons/logout.svg'

function Header() {
    const { openPopup, closeAllPopups } = usePopup();
    const elemntClass = document.getElementsByClassName("header__navburger");
    const { loggedIn, user, handleLogout } = useAuth();
    const navBurgerChange = () => {
        if (!elemntClass[0].classList.contains('open')) {
            elemntClass[0].classList.add('open');
        } else {
            elemntClass[0].classList.remove('open');
            closeAllPopups();
        }
    };
    return (
        <header className="header">
            <div className="header_wrap">
                <img src={logo} alt="Logo" className="header__logo" />
                <div className="header__div">
                    {loggedIn ?
                        <><span><p onClick={() => handleLogout()} className="header__link header__button" >{user.firstName}<img className="header__button-image" src={exitImg} alt="Log out" /></p></span><p className="header__home header__button" elemnt={<Navigate replace to="/saved-news" />}>saved news</p><p className="header__home header__button">Home</p></>
                        :
                        <> <p onClick={() => openPopup('signin')} className="header__link header__button" elemnt={<Navigate replace to="/signin" />}>Sign in</p>
                            <p className="header__home header__button">Home</p></>}

                </div>

                <div className={`header__navburger`} onClick={() => { openPopup('nav'); navBurgerChange() }}>
                    <img className="nav1" src={nav1} alt="" />
                    <img className="nav2" src={nav2} alt="" />
                </div>
            </div>
        </header>
    );
}

export default Header;