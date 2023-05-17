import React ,{useState} from "react";
import Signin from '../Signin/Signin';
import Nav from '../Navigation/Nav';
import Signup from '../Signup/Signup';
import SuccessPopup from '../SuccessPopup/SuccessPopup';
import { usePopup } from "../../contexts/PopupContext";
import { useAuth } from "../../contexts/AuthContext";


const Popups = ({ signIn, signUp }) => {
    const [userEmail, setUserEmail] = useState([]);
    const { popupState, setPopupState } = usePopup();
    const { setLoggedIn, setToken } = useAuth();
    const [tooltipStatus, setTooltipStatus] = useState(false);
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);


    const handleLogin = (email, password) => {
        signIn(email, password)
            .then(res => {
                if (res.token) {
                    setLoggedIn(true);
                    localStorage.setItem('token', res.token);
                    setToken(res.token);
                    setUserEmail(email);
                    setPopupState({
                        ...popupState,
                        signin: false,
                    });
                } else {
                    setTooltipStatus(false);
                    setIsInfoTooltipOpen(true);
                }
            })
            .catch((err) => {
                console.log(err);
                setTooltipStatus(false);
                setIsInfoTooltipOpen(true);
            });
    }

    const handleRegister = (email, password,name) => {
        signUp(email, password, name)
            .then(res => {
                console.log(res.data, "register")
                if (res.data._id) {
                    setTooltipStatus(true);
                    localStorage.setItem('email', email)
                    setPopupState({
                        ...popupState,
                        signup: false,
                        successPopup: true
                    });
                } else {
                    setTooltipStatus(false);
                    
                }
            }).catch(err =>
                 console.log(err)).finally(() => setIsInfoTooltipOpen(false));
    }
    
    return (
        <>
            <Signup handleRegister={handleRegister} popupState={popupState}  />
            <Signin handleLogin={handleLogin} popupState={popupState} setPopupState={setPopupState} />
            <Nav popupState={popupState} />
            <SuccessPopup />
        </>
    );
};

export default Popups;