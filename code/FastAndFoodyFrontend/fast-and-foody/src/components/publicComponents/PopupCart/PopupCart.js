import "./PopupCart.css"
import OrderItemComponent from "../OrderItemComponent/orderItemComponent";
import {useCallback, useEffect, useState} from "react";

export default function PopupCart(props) {

    const [items, setItems] = useState([]);

    const [total, setTotal] = useState(0);

    const fetchOrderItemsHandler = useCallback(async () => {
        // if user isn't authorized
        let storedItems = JSON.parse(localStorage.getItem("items"));
        console.log(storedItems);
        for (let i = 0; i < storedItems?.length; i++) {
            for (let j = i + 1; j < storedItems?.length; j++) {
                if (storedItems[i].itemId === storedItems[j].itemId) {
                    storedItems[i].amount += storedItems[j].amount;
                    storedItems[i].total += storedItems[j].total;
                    storedItems.splice(j, 1);
                    j--;
                }
            }
        }

        setTotal(storedItems?.reduce((acc, item) => acc + item.total, 0));

        setItems(storedItems)
    }, [])

    useEffect(() => {
        fetchOrderItemsHandler();
    }, [fetchOrderItemsHandler]);

    const cleanBasket = () => {
        localStorage.removeItem("items");
        setTotal(0)
        fetchOrderItemsHandler()
    }

    return (
        <div className="popupCart">
            <div className="popupCart-block">
                <p className="popupCart-title">Cart</p>
                <div className="popupCart-list">
                    {items?.map((item) => {
                        return (
                            <OrderItemComponent reload={fetchOrderItemsHandler} item={item}/>
                        )
                    })}
                </div>

                {items?.length > 0 && (
                    <div className="popupCart-total-block">
                        <p className="popupCart-total">Total: {total}$</p>

                        <button className="popupCart-clean-basket-button" onClick={cleanBasket}>Clean basket</button>
                    </div>
                )}

                <button className="popupCart-order-button">Create order</button>
            </div>
        </div>
    )
}