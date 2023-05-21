import React, { useEffect, useState } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import { usePopup } from "../../contexts/PopupContext";
import { signUp } from "../../utils/MainApi";


const Signup = ({ isLoading, handleRegister, setErrMessage, errMessage }) => {
    const [isFormValid, setIsFormValid] = useState(false);
    const { popupState, setPopupState } = usePopup();

    const [userLoginInfo, setUserLoginInfo] = useState({
        email: "",
        password: "",
        username: ""
    });
    const [validation, setValidation] = useState({
        email: "",
        password: "",
        username: ""
        // Add more fields if necessary
    });


    function handleSubmit(e) {
        e.preventDefault();
        const { email, password, username } = userLoginInfo;
        handleRegister(email, password, username);
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
            setValidation(prevValidation => ({
                ...prevValidation,
                email: isEmailValid ? "" : "Please add a correct email"
            }));
        } else if (name === 'password') {
            const isPasswordValid = value.trim() !== '';
            setValidation(prevValidation => ({
                ...prevValidation,
                password: isPasswordValid ? "" : "Password can't be empty"
            }));
        } else if (name === 'username') {
            const isNameValid = value.trim() !== '';
            setValidation(prevValidation => ({
                ...prevValidation,
                username: isNameValid ? "" : "User name can't be empty"
            }));
        }
    }
    const onClose = () =>
        setPopupState({
            ...popupState,
            signup: false,
        })
    const signupValidtion = validation && validation.email === "" && validation.password === "" && validation.username === "";
    const validateForm = () => {

        if (userLoginInfo.email !== '' && userLoginInfo.password !== "" && userLoginInfo.username !== "") {
            setIsFormValid(true);
            if (signupValidtion) {
                setIsFormValid(true);
            }

        } else {
            setIsFormValid(false);
        }
    };
  
   
    useEffect(() => {
        console.log("signup", userLoginInfo)
        validateForm();
    })

    return (<PopupWithForm
        setErrMessage={setErrMessage}
        errMessage={errMessage}
        validation={validation}
        isFormValid={isFormValid}
        isOpen={popupState.signup}
        setIsFormValid={setIsFormValid}
        onClose={onClose}
        title="sign up"
        name="signup"
        buttonText={`${isLoading ? "Connecting..." : "sign up"}`}
        onSubmit={handleSubmit} >
        < label className="signin-label"
            htmlFor="email" >
            Email </label> <input type="email"
                name="email"
                id="email"
                className="popup__input login-form__input"
                placeholder="Email"
                value={userLoginInfo.email}
                onChange={handleChange}
                required />
        {validation.email && <p className="popup__input login-form__input-vakidation">{validation.email}</p>}
        <label className="signin-label"
            htmlFor="password" >
            Password </label> <input type="password"
                name="password"
                id="password"
                className="popup__input login-form__input"
                placeholder="Password"
                value={userLoginInfo.password}
                onChange={handleChange}
                required />
        {validation.password && <p className="popup__input login-form__input-vakidation">{validation.password}</p>}
        <label className="signin-label"
            htmlFor="username" >
            Username </label> <input type="text"
                name="username"
                id="username"
                className="popup__input login-form__input"
                placeholder="user name"
            defaultValue={userLoginInfo.username}
                onChange={handleChange}
                required />
        {validation.username && <p className="popup__input login-form__input-vakidation">{validation.username}</p>}
    </PopupWithForm>
    );
}
export default Signup;