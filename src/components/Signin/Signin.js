import React, { useState, useRef, useEffect } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";


const Signin = ({ isLoading, handleLogin ,popupState,setPopupState}) => {
    
    const [userLoginInfo, setUserLoginInfo] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = userLoginInfo;
        handleLogin(email, password);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserLoginInfo({
            ...userLoginInfo,
            [name]: value,
        });
    };

    return (

        <PopupWithForm isOpen={popupState.signin}
            onClose={() => setPopupState({
         ...popupState,
         signin: false,
             })
         }
            title="sign in"
            name="signin"
            buttonText={`${isLoading ? "Connecting..." : "Sign in"}`}
            onSubmit={handleSubmit} >
            <label className="signin-label"
                htmlFor="email" >
                Email </label>
            <input type="email"
                name="email"
                id="email"
                className="popup__input login-form__input"
                placeholder="Email"
                value={userLoginInfo.email}
                onChange={handleChange}
                required />
            <label className="signin-label"
                htmlFor="password" >
                Password </label>
            <input type="password"
                name="password"
                id="password"
                className="popup__input login-form__input"
                placeholder="Password"
                value={userLoginInfo.password}
                onChange={handleChange}
                required />
        </PopupWithForm>

    );
};

export default Signin;