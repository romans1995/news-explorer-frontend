import React,{ useEffect } from "react";
import './Popup.css';
const Popup = ({ isOpen, onClose, name, title, children, errMessage }) => {
    useEffect(() => {
        // with this we prevent adding the listener if the popup is not opened
        if (!isOpen) return;
        // we should define the handler inside `useEffect`, so that it wouldn’t lose the reference to be able to remove it
        const closeByEscape = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        }

        document.addEventListener('keydown', closeByEscape)
   
        return () => document.removeEventListener('keydown', closeByEscape)
        // here we watch `isOpen` to add the listener only when it’s opened
    }, [isOpen, onClose])

    // here is the overlay handler
    const handleOverlay = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }

 return (
        <div
            className={`popup ${name} ${isOpen ? "popup__active" : ""}`}
         onClick={handleOverlay}
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