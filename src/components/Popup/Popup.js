import React from "react";
import './Popup.css';
const Popup = ({ isOpen, onClose, name, title, children, errMessage }) => {
 return (
        <div
            className={`popup ${name} ${isOpen ? "popup__active" : ""}`}
        >
            <div className="popup__container">
                <button
                    className="popup__close-btn"
                    type="button"
                    onClick={onClose}
                ></button>
                <h2 className="popup__title">{title}</h2>
             {errMessage && <p className="popup__input login-form__input-vakidation">{errMessage}</p>}
                {children}
            </div>
        </div>
    );
};

export default Popup;