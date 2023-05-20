import React, { useState, useEffect } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";


const Signin = ({ isLoading, handleLogin, popupState, setPopupState, isFormValid, setIsFormValid }) => {
    
   
    const [userLoginInfo, setUserLoginInfo] = useState({
        email: "",
        password: "",
    });
    const [validationForUserEmail, setValidationForUserEmail] =useState("")
    const [validationForUserPassword, setValidationForUserPassword] =useState("")
    

    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = userLoginInfo;
            setIsFormValid(true)
            handleLogin(email, password);
        
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserLoginInfo((prevUserInfo) => ({
            ...prevUserInfo,
            [name]: value
        }));

        if (name === 'email') {
            const emailPattern = /^[^\s@]{4,}@[^\s@]+\.[^\s@]+$/;
            // Email validation regex pattern
            const isEmailValid = value.trim() !== '' && emailPattern.test(value);
            setIsFormValid(isEmailValid);

            if (!isEmailValid) {
                setValidationForUserEmail("Please add a correct email");
            } else {
                setValidationForUserEmail(""); // Clear the validation message
            }
        } else if (name === 'password') {
            const isPasswordValid = value.trim() !== '';
            setIsFormValid(isPasswordValid);

            if (!isPasswordValid) {
                setValidationForUserPassword("Password can't be empty");
            } else {
                setValidationForUserPassword(""); // Clear the validation message
            }
        }
    };
    const onClose = () =>
        setPopupState({
            ...popupState,
            signin: false,
        })


    
    useEffect(() => {
        if ( validationForUserPassword !== "" || validationForUserEmail !== "") {
            setIsFormValid(false)
        }else{
            setIsFormValid(true)
        }
    })

    return (

        <PopupWithForm
            isFormValid={isFormValid}
            setIsFormValid={setIsFormValid}
        isOpen={popupState.signin}
            onClose={onClose}
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
            <p className="popup__input login-form__input-vakidation">{validationForUserEmail}</p>
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
            <p className="popup__input login-form__input-vakidation">{validationForUserPassword}</p>
        </PopupWithForm>

    );
};

export default Signin;