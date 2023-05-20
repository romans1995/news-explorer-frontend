import React, { useEffect, useState } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import { usePopup } from "../../contexts/PopupContext";


const Signup = ({ isLoading, handleRegister, isInfoTooltipOpen, isFormValid, setIsFormValid }) => {
    const { popupState, setPopupState } = usePopup();

    const [userLoginInfo, setUserLoginInfo] = useState({
        email: "",
        password: "",
        userName: ""
    });
    const [validationForUserEmail, setValidationForUserEmail] = useState("");
    const [validationForUserPassword, setValidationForUserPassword] = useState("");
    const [validationForUserName, setValidationForUserName] = useState("")

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
        } else if (name === 'username') {
            const isNameValid = value.trim() !== '';
            setIsFormValid(isNameValid);

            if (!isNameValid) {
                setValidationForUserName("Name can't be empty");
            } else {
                setValidationForUserPassword(""); // Clear the validation message
            }
        }
}
    const onClose = () =>
setPopupState({
    ...popupState,
    signup: false,
})
        useEffect(()=>{
            if (validationForUserName !== "" || validationForUserPassword !== "" || validationForUserEmail !== ""){
                setIsFormValid(false)
            }
        }, [ setIsFormValid])

    return ( <PopupWithForm
        isFormValid={isFormValid}
        setIsFormValid={setIsFormValid}
        isOpen = { popupState.signup }
      onClose={onClose}
        title = "sign up"
        name = "signup"
        buttonText = { `${isLoading ? "Connecting..." : "sign up"}` }
        onSubmit = { handleSubmit } >
        < label className = "signin-label"
        htmlFor = "email" >
        Email </label> <input type = "email"
        name = "email"
        id = "email"
        className = "popup__input login-form__input"
        placeholder = "Email"
        value = { userLoginInfo.email }
        onChange = { handleChange }
        required />
        <p className="popup__input login-form__input-vakidation">{validationForUserEmail}</p>
        <label className = "signin-label"
        htmlFor = "password" >
        Password </label> <input type = "password"
        name = "password"
        id = "password"
        className = "popup__input login-form__input"
        placeholder = "Password"
        value = { userLoginInfo.password }
        onChange = { handleChange }
        required />
        <p className="popup__input login-form__input-vakidation">{validationForUserPassword}</p>
        <label className = "signin-label"
        htmlFor = "username" >
        Username </label> <input type = "text"
        name = "username"
        id = "username"
        className = "popup__input login-form__input"
        placeholder = "user name"
        defaultValue = { userLoginInfo.userName || "" }
        onChange = { handleChange }
        required />
        <p className="popup__input login-form__input-vakidation">{validationForUserName}</p>
        </PopupWithForm>
    );
}
export default Signup;