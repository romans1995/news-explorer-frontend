import { useEffect } from "react";
import { usePopup } from "../../contexts/PopupContext";
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Nav = () => {
    const elemntClass = document.getElementsByClassName("header__navburger");
    const { openPopup,  popupState } = usePopup();
    const { loggedIn } = useAuth();

    const turnOffNav= () =>{
        popupState.nav = false;
        elemntClass[0].classList.remove('open');
        
    }
    return (
        <div className={`navMobile ${popupState.nav ? "nav_active" : ""}`}>
           
            <div className="navMobile__ul">
                {loggedIn ?
                    <><p className="navMobile__ul-home"><a href="/">Home</a></p><p className="navMobile__ul-saved-articles" elemnt={<Navigate replace to="/saved-news"/>}>Saved Articles</p><p>Log Out</p></>
                :
                <><p className="navMobile__ul-home"><a href="/">Home</a></p><button className="navMobile__signin" onClick={() => { ; turnOffNav(); openPopup('signin'); } } elemnt={<Navigate replace to="/signin" />}>Sign in</button></>
}
            </div>
            
        </div>
    );
}
export default Nav;
