import "./MenuItemComponent.css"
import plus from "../../../images/add-item.svg"
import {useState} from "react";
import PopupItemDetails from "../PopupItemDetails/PopupItemDetails";
import PopupOrderItem from "../PopupOrderItem/PopupOrderItem";
import PopupAddedItem from "../PopupAddedItem/PopupAddedItem";

export default function MenuItemComponent(props) {

    const item = props.item;

    const [detailsIsOpen, setDetailsIsOpen] = useState(false);
    const [showOrderItem, setShowOrderItem] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    const openDetails = () => {
        setDetailsIsOpen(true);
    }

    const closeDetails = () => {
        setDetailsIsOpen(false);
    }

    const openOrderItem = () => {
        setShowOrderItem(true);
    }

    const closeOrderItem = () => {
        setShowOrderItem(false);
    }

    const openPopupSuccess = () => {
        setShowSuccessPopup(true);
        setTimeout(() => {setShowSuccessPopup(false)}, 4000)
    }

    const closePopupSuccess = () => {
        setShowSuccessPopup(false);
    }

    return (
        <div className="menuItemComponent-container" key={item.id} onClick={(event) => {
            event.stopPropagation();
            openDetails();
        }}>

        <img src={item.image} className="menuItemComponent-image"/>

            <div className="menuItemComponent-info-block">
                <div className="menuItemComponent-info">
                    <p className="menuItemComponent-info-itemName">{item.itemName}</p>
                    <p className="menuItemComponent-info-itemPrice">{item.price}$</p>
                </div>

                <div className="menuItemComponent-add-button-block">
                    <button className="menuItemComponent-add-button" onClick={(event) => {
                        event.stopPropagation();
                        openOrderItem()
                    }}>
                        <img src={plus} className="menuItemComponent-add-button-icon"/>
                    </button>
                </div>
            </div>

            {detailsIsOpen && (<PopupItemDetails item={item} close={closeDetails} />)}
            {showOrderItem && (<PopupOrderItem item={item} close={closeOrderItem} openSuccess={openPopupSuccess}/>)}
            {showSuccessPopup && (<PopupAddedItem close={closePopupSuccess}/>)}
        </div>
    )
}