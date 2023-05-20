import React from "react";
import Popup from "../Popup/Popup";
import { usePopup } from '../../contexts/PopupContext';
const PopupWithForm = (props) => {
    const popupContext = usePopup();

    let popupToOpen = props.name === 'signin' ? 'signup' : 'signin';
    const handleRedirect = () => {
        popupContext.closeAllPopups();
        popupContext.openPopup(popupToOpen);
        if (popupToOpen === 'signin'){
            popupContext.setPopupState({
                ...popupContext.popupState,
                signup: false,
                signin:true
            });
        }
        props.setIsFormValid(false)
        
    };
    const disableButton = !props.isFormValid ? `popup__submit-button popup__submit-button-${props.name}::disabled` : `popup__submit-button popup__submit-button-${props.name}`;

 
    return (
        <Popup title={props.title} isOpen={props.isOpen} name={props.name} onClose={props.onClose}>
            <form
                action="submit"
                className={`popup__inputs-container popup__inputs-${props.name}`}
                name={props.name}
                onSubmit={props.onSubmit}
            >
                {props.children}
                <button
                    disabled={!props.isFormValid}
                    className={disableButton}
                    type="submit"
                >
                    {props.buttonText}
                </button>
                <p> or <button type="button" className="signin__redirect-button" onClick={handleRedirect}  >{popupToOpen} </button></p>
            </form>

        </Popup>
    );
};

export default PopupWithForm;
