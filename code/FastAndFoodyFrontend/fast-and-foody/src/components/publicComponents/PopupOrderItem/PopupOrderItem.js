import "./PopupOrderItem.css"
import {useState} from "react";

export default function PopupOrderItem(props) {

    const item = props.item

    const [countOfItems, setCountOfItems] = useState(1)

    const total = item.price * countOfItems

    const divisionButton = () => {
        if (countOfItems > 1) {
            setCountOfItems(countOfItems - 1)
        }
    }

    const additionButton = () => {
        if (countOfItems < 20) {
            setCountOfItems(countOfItems + 1)
        }
    }

    const addToCart = () => {
        const orderItem = {
            itemId: item.id,
            amount: countOfItems,
            total: total
        };

        let items = JSON.parse(localStorage.getItem("items"));

        if (!Array.isArray(items)) {
            items = [];
        }

        let found = false;

        for (let i = 0; i < items.length; i++) {
            if (items[i].itemId === orderItem.itemId) {
                items[i].amount += countOfItems;
                items[i].total *= items[i].amount;
                found = true;
                break;
            }
        }

        if (!found) {
            items.push(orderItem);
        }

        localStorage.setItem("items", JSON.stringify(items));

        props.close();
        props.openSuccess();
    };


    return (
        <div onClick={e => e.stopPropagation()}>
            <div className="back-order-item" onClick={(event) => { event.stopPropagation(); props.close() }}></div>


            <div className="modal-justify-order-item">
                <div className="modal-screen-order-item">
                    <div className="modal-header">
                        <p className="popupOrderItem-title">Selected product</p>

                        <button className={`close-button`} onClick={(event) => { event.stopPropagation(); props.close() }}>&times;</button>
                    </div>

                    <div className="popupOrderItem-block">
                        <img className="popupOrderItem-image" src={item.image} />

                        <div className="popupOrderItem-text">
                            <div className="popupOrderItem-title-block">
                                <p className="popupOrderItem-title-text">Item name:</p>
                                <p className="popupOrderItem-title-value">{item.itemName}</p>
                            </div>

                            <div className="popupOrderItem-count-price-block">
                                <div className="popupOrderItem-count-block">
                                    <p className="popupOrderItem-count-text">Count</p>
                                    <div className="popupOrderItem-counter-block">
                                        <button onClick={divisionButton} className={`popupOrderItem-counter-button`}>-</button>
                                        <div className="popupOrderItem-count-value-block">
                                            <p className="popupOrderItem-count-value">{countOfItems}</p>
                                        </div>
                                        <button onClick={additionButton} className={`popupOrderItem-counter-button`}>+</button>
                                    </div>
                                </div>

                                <div className="popupOrderItem-price-block">
                                    <p className="popupOrderItem-price-text">Total</p>
                                    <p className="popupOrderItem-price-value">{total}$</p>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
                <div className="sumbitOrder-button">
                    <button className="popupOrderItem-submit-button" onClick={addToCart}>Add to a cart</button>
                </div>
            </div>
        </div>
    )
}