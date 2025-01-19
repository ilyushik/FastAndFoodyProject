import "./PopupCart.css"
import OrderItemComponent from "../OrderItemComponent/orderItemComponent";
import { useCallback, useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";

export default function PopupCart(props) {
    const [items, setItems] = useState([]);
    const [total, setTotal] = useState(0);

    const navigate = useNavigate();

    const fetchOrderItemsHandler = useCallback(() => {
        let storedItems = JSON.parse(localStorage.getItem("items")) || [];
        setTotal(storedItems.reduce((acc, item) => acc + item.total, 0));
        setItems([...storedItems]); // Создаём новый массив
        localStorage.setItem("items", JSON.stringify(storedItems)); // Обновляем localStorage
    }, []);

    useEffect(() => {
        fetchOrderItemsHandler();
    }, [fetchOrderItemsHandler]);

    const cleanBasket = () => {
        localStorage.removeItem("items");
        setItems([]); // Очистка списка в состоянии
        setTotal(0);
    };

    const submitOrder = () => {
        navigate("/order-form");
    }

    return (
        <div className="popupCart">
            <div className="popupCart-block">
                <p className="popupCart-title">Cart</p>
                <div className="popupCart-list">
                    {items.map((item) => (
                        <OrderItemComponent key={item.itemId} reload={fetchOrderItemsHandler} item={item} />
                    ))}
                </div>

                {items.length > 0 && (
                    <div className="popupCart-total-block">
                        <p className="popupCart-total">Total: {total}$</p>
                        <button className="popupCart-clean-basket-button" onClick={cleanBasket}>Clean basket</button>
                    </div>
                )}

                <button className="popupCart-order-button" onClick={submitOrder}>Create order</button>
            </div>
        </div>
    );
}
