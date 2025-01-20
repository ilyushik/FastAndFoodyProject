import "./orderItemComponent.css"
import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import basket from "../../../images/delete_icon.png"

export default function OrderItemComponent(props) {

    const [item, setItem] = useState({});

    const fetchItemHandler = useCallback(async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_LINK}/item/${props.item.itemId}`, {
                // headers: {
                //     'Content-Type': 'application/json',
                //     'Authorization': `Bearer ${localStorage.getItem("token")}`
                // }
            });
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

    const removeItem = () => {
        let items = JSON.parse(localStorage.getItem("items")) || [];

        for (let i = 0; i < items.length; i++) {
            if (items[i].itemId === props.item.itemId) {
                console.log(`Item ${items[i].itemId} removed`);
                items.splice(i, 1);
                i--;
            }
        }

        localStorage.setItem("items", JSON.stringify(items));
    };


    return (
        <div className="orderItemComponent" key={props.item.itemId}>
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

            <img src={basket} className="orderItemComponent-remove-icon" onClick={() => {
                removeItem()
                props.reload()
            }}/>
        </div>
    )
}