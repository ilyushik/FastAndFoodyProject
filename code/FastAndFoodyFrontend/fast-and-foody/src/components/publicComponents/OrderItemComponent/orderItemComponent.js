import "./orderItemComponent.css"
import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import basket from "../../../images/delete_icon.png"

export default function OrderItemComponent(props) {

    const [item, setItem] = useState({});

    const fetchItemHandler = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:8080/item/${props.item.itemId}`, {});
            console.log(response.data);
            console.log(props.item);
            setItem(response.data);
        } catch (e) {
            console.log(e.response.data)
        }
    }, [])

    useEffect(() => {
        fetchItemHandler()
    }, [fetchItemHandler])

    const removeItem = (item) => {
        let items = JSON.parse(localStorage.getItem("items"));
        items.splice(items.indexOf(item), 1);
        localStorage.setItem("items", JSON.stringify(items));
    }

    return (
        <div className="orderItemComponent" key={item.id}>
            <img src={item.image} className="orderItemComponent-image" />

            <div className="orderItemComponent-text">
                <p className="orderItemComponent-title">Name</p>

                <p className="orderItemComponent-value">{item.itemName}</p>
            </div>

            <div className="orderItemComponent-text">
                <p className="orderItemComponent-title">Amount</p>

                <p className="orderItemComponent-value">{props.item.amount}</p>
            </div>

            <div className="orderItemComponent-text">
                <p className="orderItemComponent-title">Total</p>

                <p className="orderItemComponent-value">{props.item.total}$</p>
            </div>

            <img src={basket} className="orderItemComponent-remove-icon" onClick={(item) => {
                removeItem(item)
                props.reload()
            }}/>
        </div>
    )
}