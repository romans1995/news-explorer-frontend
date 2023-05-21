import React ,{useState} from "react";
import Signin from '../Signin/Signin';
import Nav from '../Navigation/Nav';
import Signup from '../Signup/Signup';
import SuccessPopup from '../SuccessPopup/SuccessPopup';
import { usePopup } from "../../contexts/PopupContext";
import { useAuth } from "../../contexts/AuthContext";


const Popups = ({ signIn, signUp }) => {
    
    const { popupState, setPopupState } = usePopup();
    const { setLoggedIn, setToken, checkTocken } = useAuth();
   
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);



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
                } else {
                    
                    setIsInfoTooltipOpen(true);
                }
            })
            .catch((err) => {
                console.log(err);
                
                setIsInfoTooltipOpen(true);
            });
    }

    const handleRegister = (email, password,name) => {
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
            <Signup handleRegister={handleRegister} popupState={popupState} />
            <Signin handleLogin={handleLogin} popupState={popupState} setPopupState={setPopupState}/>
            <Nav popupState={popupState} />
            <SuccessPopup />
        </>
    );
};

export default Popups;