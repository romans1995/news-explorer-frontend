import React, { useState } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import { usePopup } from "../../contexts/PopupContext";


const Signup = ({ isLoading }) => {
    const { popupState, setPopupState } = usePopup();

const [userLoginInfo, setUserLoginInfo] = useState({
        email: "",
        password: "",
        userName:""
    });

    function handleSubmit(e) {
        e.preventDefault();

        // do something with the user login info
        console.log(userLoginInfo);

        // reset the user login info
        setUserLoginInfo({
            email: "",
            password: "",
        });

        // close the signup popup
        setPopupState({
            ...popupState,
            signup: false,
        });
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserLoginInfo({
            ...userLoginInfo,
            [name]: value,
        });
    };

    return (
            <PopupWithForm
                isOpen={popupState.signup}
                onClose={() =>
                    setPopupState({
                        ...popupState,
                        signup: false,
                    })
                }
                title="sign up"
                name="signup"
                buttonText={`${isLoading ? "Connecting..." : "Connect"}`}
                onSubmit={handleSubmit}
            >
                <label className="signin-label" htmlFor="email">
                    Email
                </label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    className="popup__input login-form__input"
                    placeholder="Email"
                    value={userLoginInfo.email}
                    onChange={handleChange}
                    required
                />
                <label className="signin-label" htmlFor="password">
                    Password
                </label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    className="popup__input login-form__input"
                    placeholder="Password"
                    value={userLoginInfo.password}
                    onChange={handleChange}
                    required
                />
            <label className="signin-label" htmlFor="username">
                Username
            </label>
            <input
                type="text"
                name="username"
                id="username"
                className="popup__input login-form__input"
                placeholder="user name"
                defaultValue={userLoginInfo.userName||""}
                onChange={handleChange}
                required
            />
            </PopupWithForm>
    );
}
export default Signup;