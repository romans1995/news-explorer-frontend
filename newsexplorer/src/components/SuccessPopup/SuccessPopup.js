import Popup from "../Popup/Popup";
import { usePopup } from '../../contexts/PopupContext';



const SuccessPopup = () => {
    const popupContext = usePopup();
    const handleRedirect = () => {
        popupContext.setPopupState({
            ...popupContext.popupState,
            successPopup: false,
            signin:true
        });
    };
    console.log("fuuuuuu", popupContext.popupState)
    return(
        <Popup name="success" title={"Registration successfully completed!"}
            isOpen={popupContext.popupState.successPopup}>
            <button className="popup__redirect" onClick={handleRedirect}>Sign in</button>
        </Popup>
    )
    

}
export default SuccessPopup;