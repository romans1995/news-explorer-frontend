import React, { useState } from "react";
import Signin from '../Signin/Signin';
import Nav from '../Navigation/Nav';
import Signup from '../Signup/Signup';
import SuccessPopup from '../SuccessPopup/SuccessPopup';
import { usePopup } from "../../contexts/PopupContext";
import { useAuth } from "../../contexts/AuthContext";


const Popups = ({ signIn, signUp }) => {

    const { popupState, setPopupState } = usePopup();
    const { setLoggedIn, setToken, checkTocken } = useAuth();
    const [errMessage, setErrMessage] = useState("");
    // const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);



    const handleLogin = (email, password) => {
        signIn(email, password)
            .then(res => {
                if (res.token) {
                    setLoggedIn(true);
                    localStorage.setItem('token', res.token);
                    setToken(res.token);
                    checkTocken(res.token)
                    setPopupState({
                        ...popupState,
                        signin: false,
                    });
                    window.location.reload();
                } 
            })
            .catch((err) => {
                console.log(err);
                setErrMessage("This user Dont exist");
            });
    }

    const handleRegister = (email, password, name) => {
        setErrMessage("")
        if(password.length < 10 ){
            setErrMessage("Password must be longer then 10 digits");
        }else if(name.length < 3){
            setErrMessage("User name must be longer");
        }
        signUp(email, password, name)
            .then(res => {
                if (res.data._id) {

                    localStorage.setItem('email', email);
                    setPopupState({
                        ...popupState,
                        signup: false,
                        successPopup: true
                    });

                }
            }).catch(err =>
                console.log(err));
    }

    return (
        <>
            <Signup handleRegister={handleRegister} popupState={popupState} errMessage={errMessage} setErrMessage={setErrMessage} />
            <Signin handleLogin={handleLogin} popupState={popupState} setPopupState={setPopupState} errMessage={errMessage} setErrMessage={setErrMessage} />
            <Nav popupState={popupState} />
            <SuccessPopup />
        </>
    );
};

export default Popups;