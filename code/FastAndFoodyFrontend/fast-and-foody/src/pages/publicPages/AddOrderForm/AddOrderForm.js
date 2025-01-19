import "./AddOrderForm.css";
import Layout from "../../../components/usersComponents/Layout/Layout";
import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import AddOrderFormItemComponent
    from "../../../components/publicComponents/AddOrderFormItemComponent/AddOrderFormItemComponent";
import Select from "react-select";

export default function AddOrderForm() {
    const [items, setItems] = useState([]);
    const [deliveryWay, setDeliveryWay] = useState([]);
    const [selectedDeliveryWay, setSelectedDeliveryWay] = useState(null);
    const [paymentWay, setPaymentWay] = useState([]);
    const [selectedPaymentWay, setSelectedPaymentWay] = useState(null);

    const [totalPrice, setTotalPrice] = useState(0);

    const fetchItemsHandler = useCallback(() => {
        const loadedItems = JSON.parse(localStorage.getItem("items") || "[]");
        console.log(loadedItems);
        setItems(loadedItems);

        const calculatedTotalPrice = loadedItems.reduce((total, item) => total + (item.total || 0), 0);
        setTotalPrice(calculatedTotalPrice);
    }, []);

    const fetchDeliveryWayHandler = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/additional/delivery-way`);

            const updatedDeliveryWays = response.data.map(item => ({
                value: item.way,
                label: item.way
            }));

            setDeliveryWay(updatedDeliveryWays); // Обновляем сразу весь массив
        } catch (e) {
            console.log(e.response?.data || e.message);
        }
    };

    const fetchPaymentWayHandler = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/additional/payment-way`);

            const updatedPaymentWays = response.data.map(item => ({
                value: item.way,
                label: item.way
            }))

            setPaymentWay(updatedPaymentWays);
        } catch (e) {
            console.log(e.response.data)
        }
    }

    useEffect(() => {
        fetchItemsHandler();
    }, [fetchItemsHandler]);

    useEffect(() => {
        fetchDeliveryWayHandler();
    }, []);

    useEffect(() => {
        fetchPaymentWayHandler();
    }, []);

    const handleDeliveryWayChange = (selectedOption) => {
        setSelectedDeliveryWay(selectedOption);
        console.log("Selected delivery way:", selectedOption);
    };

    const handlePaymentWayChange = (selectedOption) => {
        setSelectedPaymentWay(selectedOption);
        console.log("Selected payment way:", selectedOption);
    };

    return (
        <Layout>
            <div className="addOrderForm-background">
                <div className="addOrderForm-container">
                    <div className="addOrderForm-restaurantInfo">
                        <p className="addOrderForm-restaurantInfo-title">Information about restaurant</p>
                        <p className="addOrderForm-restaurantInfo-value">Restaurant №1</p>
                        <p className="addOrderForm-restaurantInfo-value">Miru av. 123a</p>
                    </div>

                    <div className="addOrderForm-listOfItemsInfo">
                        <p className="addOrderForm-listOfItemsInfo-title">List of items</p>
                        <div className="addOrderForm-listOfItemsInfo-values">
                            {items?.map((item, index) => (
                                <AddOrderFormItemComponent key={index} item={item} />
                            ))}
                        </div>
                    </div>

                    <div className="addOrderForm-delivery-way">
                        <p className="addOrderForm-delivery-way-title">Delivery way</p>

                        <Select
                            className="addOrderForm-delivery-way-select"
                            options={deliveryWay}
                            value={selectedDeliveryWay}
                            onChange={handleDeliveryWayChange}
                            placeholder="Select delivery way"
                            isClearable
                        />
                    </div>

                    <div className="addOrderForm-payment-way">
                        <p className="addOrderForm-payment-way-title">Payment way</p>

                        <Select
                            className="addOrderForm-payment-way-select"
                            options={paymentWay}
                            value={selectedPaymentWay}
                            onChange={handlePaymentWayChange}
                            placeholder="Select payment way"
                            isClearable
                        />
                    </div>

                    <div className="addOrderForm-confirm-order">
                        <p className="addOrderForm-confirm-order-title">Order total: {totalPrice}$</p>

                        <button className="addOrderForm-submit-button">Submit order</button>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
