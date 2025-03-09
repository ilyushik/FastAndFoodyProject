import "./OrderDetailsViewOrderItemComponent.css"
import {useEffect, useState} from "react";
import axios from "axios";

export default function OrderDetailsViewOrderItemComponent(props) {

    const itemProps = props.item;

    const [item, setItem] = useState(null);

    const fetchItemHandler = async () => {
        try {
            const response =
                await axios.get(`${process.env.REACT_APP_BACKEND_LINK}/item/${itemProps.itemId}`)
            console.log(response.data)
            setItem(response.data);
        } catch (e) {
            console.log(e.response?.data)
        }
    }

    useEffect(() => {
        fetchItemHandler();
    }, [])

    return (
        <div className="orderDetailsViewOrderItemComponent-container">
            <img src={item?.image} className="img"/>

            <div className="orderDetailsViewOrderItemComponent-text-block">
                <div className="orderDetailsViewOrderItemComponent-text-block-title-block">
                    <p className="orderDetailsViewOrderItemComponent-text-block-title">{item?.itemName}</p>
                </div>

                <div className="orderDetailsViewOrderItemComponent-text-block-title-block-info">
                    <div className="orderDetailsViewOrderItemComponent-text-block-details">
                        <div className="orderDetailsViewOrderItemComponent-text-block-details-block">
                            <p className="orderDetailsViewOrderItemComponent-title">Price</p>

                            <p className="orderDetailsViewOrderItemComponent-value">{item?.price}$</p>
                        </div>

                        <div>
                            <p className="orderDetailsViewOrderItemComponent-title">Count</p>

                            <p className="orderDetailsViewOrderItemComponent-value">{itemProps.amount}</p>
                        </div>
                    </div>

                    <div className="orderDetailsViewOrderItemComponent-text-block-details-block">
                        <p className="orderDetailsViewOrderItemComponent-title">Total</p>

                        <p className="orderDetailsViewOrderItemComponent-value">{itemProps.total}$</p>
                    </div>
                </div>
            </div>
        </div>
    )
}