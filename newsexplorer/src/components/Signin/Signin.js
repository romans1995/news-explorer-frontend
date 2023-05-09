import React, { useEffect, useState } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import { usePopup } from "../../contexts/PopupContext";
import { useAuth } from "../../contexts/AuthContext";



const Signin = ({ isLoading }) => {
    const { popupState, setPopupState } = usePopup();
    const { setLoggedIn, loggedIn } = useAuth();

    const [userLoginInfo, setUserLoginInfo] = useState({
        email: "",
        password: "",
    });

    function handleSubmit(e) {
        e.preventDefault();
        setLoggedIn(true);
        // do something with the user login info
        console.log(userLoginInfo);

        // reset the user login info
        setUserLoginInfo({
            email: "",
            password: "",
        });

        // close the signin popup
        setPopupState({
            ...popupState,
            signin: false,
        });
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserLoginInfo({
            ...userLoginInfo,
            [name]: value,
        });
    };

    useEffect(() => {
        console.log("loggedIn", loggedIn);
    }, [loggedIn]);

    return (

        <PopupWithForm
            isOpen={popupState.signin}
            onClose={() =>
                setPopupState({
                    ...popupState,
                    signin: false,
                })
            }
            title="sign in"
            name="signin"
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
        </PopupWithForm>

    );
};

export default Signin;