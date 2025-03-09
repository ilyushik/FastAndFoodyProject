import {useParams} from "react-router-dom";
import Layout from "../../../components/usersComponents/Layout/Layout";
import {useEffect, useState} from "react";
import axios from "axios";
import "./OrderDetailsView.css"
import OrderDetailsViewOrderItemComponent
    from "../../../components/usersComponents/OrderDetailsViewOrderItemComponent/OrderDetailsViewOrderItemComponent";

export default function OrderDetailsView() {

    const params = useParams();

    const id = params.id;

    const [order, setOrder] = useState({});
    const [restaurant, setRestaurant] = useState({});
    const [orderItems, setOrderItems] = useState([]);

    const fetchObjectHandler = async (link, setObject, isSecured) => {
        try {
            const response =
                await axios.get(`${process.env.REACT_APP_BACKEND_LINK}${link}`,
                    {withCredentials: !!isSecured});
            console.log(response.data)
            setObject(response.data);
        } catch (e) {
            console.log(e.response?.data)
        }
    }

    useEffect(() => {
        fetchObjectHandler(`/my-info/orders/${id}`, setOrder, true);
    }, [id])

    useEffect(() => {
        fetchObjectHandler(`/restaurant/${order?.restaurantId}`, setRestaurant, false);
    }, [order])

    useEffect(() => {
        fetchObjectHandler(`/order-item/${id}`, setOrderItems, true);
    }, [])

    const dateFormatter = (year, month, day) => {
        const date = new Date(year, month - 1, day);

        return date.toDateString()
    }

    return (
        <Layout>
            <div className="orderDetailsView-container">
                <div className="orderDetailsView-infos">
                    <div className="orderDetailsView-column">
                        <div className="orderDetailsView-column-block">
                            <p className="orderDetailsView-column-block-title">Order</p>

                            <p className="orderDetailsView-column-block-value">№{order.id}</p>
                        </div>

                        <div className="orderDetailsView-column-block">
                            <p className="orderDetailsView-column-block-title">Restaurant's address</p>

                            <p className="orderDetailsView-column-block-value">{restaurant.address}</p>
                        </div>

                        {order?.promocode && (
                            <div className="orderDetailsView-column-block">
                                <p className="orderDetailsView-column-block-title">Promo code</p>

                                <p className="orderDetailsView-column-block-value">{order.promocode}</p>
                            </div>
                        )}

                        <div className="orderDetailsView-column-block">
                            <p className="orderDetailsView-column-block-title">Status</p>

                            <p className="orderDetailsView-column-block-value">{order.status}</p>
                        </div>

                        <div className="orderDetailsView-column-block">
                            <p className="orderDetailsView-column-block-title">Date</p>

                            <p className="orderDetailsView-column-block-value">
                                {order?.date ? dateFormatter(order.date[0], order.date[1], order.date[2]) :
                                    "Дата не указана"}
                            </p>
                        </div>

                        {order?.wish && (
                            <div className="orderDetailsView-column-block">
                                <p className="orderDetailsView-column-block-title">Wish</p>

                                <p className="orderDetailsView-column-block-value">{order.wish}</p>
                            </div>
                        )}
                    </div>

                    <div className="orderDetailsView-column">
                        <div className="orderDetailsView-column-block">
                            <p className="orderDetailsView-column-block-title">Sum</p>

                            <p className="orderDetailsView-column-block-value">{order.sum}$</p>
                        </div>

                        {order?.address && (
                            <div className="orderDetailsView-column-block">
                                <p className="orderDetailsView-column-block-title">Delivery address</p>

                                <p className="orderDetailsView-column-block-value">{order.address}</p>
                            </div>
                        )}

                        <div className="orderDetailsView-column-block">
                            <p className="orderDetailsView-column-block-title">Payment way</p>

                            <p className="orderDetailsView-column-block-value">{order.paymentMethod}</p>
                        </div>

                        <div className="orderDetailsView-column-block">
                            <p className="orderDetailsView-column-block-title">Delivery way</p>

                            <p className="orderDetailsView-column-block-value">{order.deliveryWay}</p>
                        </div>
                    </div>
                </div>

                <div className="orderDetailsView-orderItems-container">
                    {orderItems.map((item) => {
                        return (
                            <OrderDetailsViewOrderItemComponent item={item} key={item.id} />
                        )
                    })}
                </div>
            </div>
        </Layout>
    )
}