import React from "react";
import Signin from '../Signin/Signin';
import Nav from '../Navigation/Nav';
import Signup from '../Signup/Signup';


const Popups = ({ popupState }) => {
    return (
        <>
            <Signup popupState={popupState} />
            <Signin popupState={popupState} />
            <Nav popupState={popupState} />
        </>
    );
};

export default Popups;