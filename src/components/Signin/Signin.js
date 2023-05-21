import React, { useState, useEffect } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";


const Signin = ({ isLoading, handleLogin, popupState, setPopupState, errMessage, setErrMessage }) => {

    
    
    const [isFormValid, setIsFormValid] = useState(false);
    const [userLoginInfo, setUserLoginInfo] = useState({
        email: "",
        password: "",
    });
    // const [validationForUserEmail, setValidationForUserEmail] =useState("")
    // const [validationForUserPassword, setValidationForUserPassword] =useState("")
    const [validation, setValidation] = useState({
        email: "",
        password: "",
       
    });
    // const areFormIsEmpty = !userLoginInfo.email && !userLoginInfo.password;
    // useEffect(() => {
    //     if (!areFormIsEmpty) {
    //         setIsFormValid(false);
    //     }
    // }, [areFormIsEmpty])
    

    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = userLoginInfo;
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
            setValidation(prevValidation =>({
                ...prevValidation,
                email: isEmailValid ? "" : "Please add a correct email"
            }));

        } else if (name === 'password') {
            const isPasswordValid = value.trim() !== '';
            setValidation(prevValidation => ({
                ...prevValidation,
                password: isPasswordValid ? "" : "Password can't be empty"
            }));
        }
    };
    const onClose = () =>
        setPopupState({
            ...popupState,
            signin: false,
        })
    const validateForm = () => {
            if (userLoginInfo.email !== '' && userLoginInfo.password !== ""){
                setIsFormValid(false);
                if (validation && validation.email === "" && validation.password === "") {
                setIsFormValid(true);
            } else {
                setIsFormValid(false);
            }
           
            }
    };
   
    useEffect(() => {
        console.log("signin", isFormValid)
        validateForm();
    })

    return (

        <PopupWithForm
            errMessage={errMessage}
            validation={validation}
            isFormValid={isFormValid}
            setErrMessage={setErrMessage}
        isOpen={popupState.signin}
            setIsFormValid={setIsFormValid}
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
            {validation.email && <p className="popup__input login-form__input-vakidation">{validation.email}</p>}
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
            {validation.password && <p className="popup__input login-form__input-vakidation">{validation.password}</p>}
        </PopupWithForm>

    );
};

export default Signin;