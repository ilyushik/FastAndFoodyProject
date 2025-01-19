import "./AddOrderFormItemComponent.css"
import {useCallback, useEffect, useState} from "react";
import axios from "axios";

export default function AddOrderFormItemComponent(props) {

    const [loadedItem, setLoadedItem] = useState({});

    const item = props.item;

    const fetchItemHandler = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:8080/item/${item.itemId}`, {})
            console.log(response.data);
            setLoadedItem(response.data);
        } catch (e) {
            console.log(e.response.data)
        }
    }, [])

    useEffect(() => {
        fetchItemHandler()
    }, [fetchItemHandler])

    return (
        <div className="addOrderFormItemComponent-container" key={item.itemId}>
            <div className="addOrderFormItemComponent-image-name">
                <img src={loadedItem.image} className="addOrderFormItemComponent-image" />

                <div className="addOrderFormItemComponent-name-block">
                    <p className="addOrderFormItemComponent-name-title">Name</p>

                    <p className="addOrderFormItemComponent-name-value">{loadedItem.itemName}</p>
                </div>
            </div>

            <div className="addOrderFormItemComponent-amount">
                <p className="addOrderFormItemComponent-amount-title">Amount</p>

                <p className="addOrderFormItemComponent-amount-value">{item.amount}</p>
            </div>

            <div className="addOrderFormItemComponent-total">
                <p className="addOrderFormItemComponent-total-title">Total</p>

                <p className="addOrderFormItemComponent-total-value">{item.total}$</p>
            </div>
        </div>
    )
}