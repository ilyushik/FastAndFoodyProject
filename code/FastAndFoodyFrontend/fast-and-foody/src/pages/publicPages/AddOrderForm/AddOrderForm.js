import "./AddOrderForm.css";
import Layout from "../../../components/usersComponents/Layout/Layout";
import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import AddOrderFormItemComponent
    from "../../../components/publicComponents/AddOrderFormItemComponent/AddOrderFormItemComponent";
import Select from "react-select";
import {useNavigate} from "react-router-dom";
import PopupSuccessfullOrder from "../../../components/publicComponents/PopupSuccessfullOrder/PopupSuccessfullOrder";
import PopupSuccessfullOrderEmail
    from "../../../components/publicComponents/PopupSuccessfullOrderEmail/PopupSuccessfullOrderEmail";

export default function AddOrderForm() {
    const [popFinishOrderOpen, setPopFinishOrderOpen] = useState(false);
    const [popFinishOrderEmailOpen, setPopFinishOrderEmailOpen] = useState(false);

    const [items, setItems] = useState([]);
    const [deliveryWay, setDeliveryWay] = useState([]);
    const [selectedDeliveryWay, setSelectedDeliveryWay] = useState(null);
    const [paymentWay, setPaymentWay] = useState([]);
    const [selectedPaymentWay, setSelectedPaymentWay] = useState(null);

    const [loadedRestaurant, setLoadedRestaurant] = useState({});

    const [totalPrice, setTotalPrice] = useState(0);

    const [email, setEmail] = useState("");

    const [address, setAddress] = useState("");

    const [wish, setWish] = useState("");

    const [promoCode, setPromoCode] = useState("");

    const [user, setUser] = useState({});

    const [error, setError] = useState({});

    const fetchRestaurantHandler = useCallback(async () => {

        const purchase = JSON.parse(localStorage.getItem("purchase"));

        try {
            const response =  await axios.get
            (`${process.env.REACT_APP_BACKEND_LINK}/restaurant/${purchase.restaurantId}`)
            console.log(response.data)
            setLoadedRestaurant(response.data)
        } catch (e) {
            console.log(e.response?.data)
        }
    }, [])

    const fetchItemsHandler = useCallback(() => {
        const loadedItems = JSON.parse(localStorage.getItem("items") || "[]");
        console.log(loadedItems);
        setItems(loadedItems);

        const calculatedTotalPrice = loadedItems.reduce((total, item) => total + (item.total || 0), 0);
        setTotalPrice(calculatedTotalPrice);
    }, []);

    const fetchDeliveryWayHandler = async () => {
        try {
            const response = await axios.get
            (`${process.env.REACT_APP_BACKEND_LINK}/additional/delivery-way`);

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
            const response = await axios.get
            (`${process.env.REACT_APP_BACKEND_LINK}/additional/payment-way`);

            const updatedPaymentWays = response.data.map(item => ({
                value: item.way,
                label: item.way
            }))

            setPaymentWay(updatedPaymentWays);
        } catch (e) {
            console.log(e.response.data)
        }
    }

    const fetchUserDataHandler = useCallback(async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_LINK}/my-info`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            });
            console.log(response.data)
            setUser(response.data);
        } catch (e) {
            console.log('user not found');
        }
    }, [])

    useEffect(() => {
        fetchItemsHandler();
    }, [fetchItemsHandler]);

    useEffect(() => {
        fetchDeliveryWayHandler();
    }, []);

    useEffect(() => {
        fetchPaymentWayHandler();
    }, []);

    useEffect(() => {
        fetchRestaurantHandler()
    }, [fetchRestaurantHandler])

    useEffect(() => {
        if (localStorage.getItem("token") !== null) {
            fetchUserDataHandler()
        }
    }, [fetchUserDataHandler])

    const handleDeliveryWayChange = (selectedOption) => {
        setSelectedDeliveryWay(selectedOption);
        console.log("Selected delivery way:", selectedOption);
    };

    const handlePaymentWayChange = (selectedOption) => {
        setSelectedPaymentWay(selectedOption);
        console.log("Selected payment way:", selectedOption);
    };

    const submitData = async () => {

        if (selectedDeliveryWay === null) {
            setError({deliveryWay: "Field can not be empty"})
            return
        }
        if (selectedPaymentWay === null) {
            setError({paymentWay: "Field can not be empty"})
            return
        }
        if (selectedDeliveryWay?.value === 'Delivery') {
            if (address.trim().length < 1) {
                setError({address: "Field can not be empty"})
                return
            }
        }

        const purchase = JSON.parse(localStorage.getItem("purchase"));

        purchase.wish = wish ? wish : null;
        purchase.paymentWay = selectedPaymentWay?.value
        purchase.deliveryWay = selectedDeliveryWay?.value
        if (localStorage.getItem("token")) {
            purchase.personId = user.id
            purchase.email = null
        } else {
            purchase.personId = null
            purchase.email = email
        }
        if (localStorage.getItem('token') === null && email.trim().length < 1) {
            setError({email: "Field cannot be empty"})
            return
        }

        purchase.items = JSON.parse(localStorage.getItem("items"));
        purchase.address = address.trim().length < 1 ? null : address
        purchase.total = totalPrice

        localStorage.setItem("purchase", JSON.stringify(purchase))

        console.log(purchase)

        if (selectedPaymentWay?.value === 'Card') {
            try {
                const response = await
                    axios.get(`${process.env.REACT_APP_BACKEND_LINK}/paypal/createPayment/${totalPrice}`)
                console.log(response.data)
                if (response.data.approval_url) {
                    window.location.href = response.data.approval_url;
                } else {
                    console.log('Approval URL not found')
                }
            } catch (e) {
                console.log(e.response?.data)
            }
        } else {
            try {
                const response = await axios.post(`${process.env.REACT_APP_BACKEND_LINK}/purchase/add`,
                    purchase)
                console.log(response.data)
                console.log("purchase", purchase)

                localStorage.removeItem("purchase");
                localStorage.removeItem("items")

                if (localStorage.getItem("token") !== null) {
                    if (response.data?.purchaseId !== null) {
                        localStorage.setItem("order", response.data?.purchaseId)
                        setPopFinishOrderEmailOpen(true)
                    } else {
                        setPopFinishOrderOpen(true)
                    }
                } else {
                    setPopFinishOrderOpen(true)
                }
            } catch (e) {
                console.log(e.response.data)
                setError(e.response.data)
            }
        }
    }

    return (
        <Layout>
            {popFinishOrderOpen && <PopupSuccessfullOrder close={() => setPopFinishOrderOpen(false)} />}
            {popFinishOrderEmailOpen &&
                <PopupSuccessfullOrderEmail purchaseId={JSON.parse(localStorage.getItem("order"))}
                                                                    close={() =>
                                                                        setPopFinishOrderEmailOpen(false)} />}
            <div className="addOrderForm-background">
                <div className="addOrderForm-container">
                    <div className="addOrderForm-restaurantInfo">
                        <p className="addOrderForm-restaurantInfo-title">Information about restaurant</p>
                        <p className="addOrderForm-restaurantInfo-value">Restaurant №{loadedRestaurant?.id}</p>
                        <p className="addOrderForm-restaurantInfo-value">{loadedRestaurant?.address}</p>
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
                    {error.deliveryWay && (<p className="addOrderForm-error">{error.deliveryWay}</p>)}

                    {selectedDeliveryWay?.value === 'Delivery' && (
                        <>
                            <div className="addOrderForm-address-block">
                                <p className="addOrderForm-address-title">Address</p>
                                <input value={address} type="text"
                                       onChange={(e) => setAddress(e.target.value)}
                                       className="addOrderForm-address-input"
                                       placeholder="Address"/>
                            </div>
                            {error.address && (<p className="addOrderForm-error">{error.address}</p>)}
                        </>
                    )}

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
                    {error.paymentWay && (<p className="addOrderForm-error">{error.paymentWay}</p>)}

                    {localStorage.getItem('token') === null && (
                        <>
                            <div className="addOrderForm-email-block">
                                <p className="addOrderForm-email-title">Email</p>
                                <input value={email} type="email"
                                       onChange={(e) => setEmail(e.target.value)}
                                       className="addOrderForm-email-input"
                                       placeholder="Email"/>
                            </div>
                            {error.email && (<p className="addOrderForm-error">{error.email}</p>)}
                        </>
                    )}

                    <div className="addOrderForm-promocode-block">
                        <p className="addOrderForm-promocode-title">Promo code</p>
                        <input value={promoCode} type="text"
                               onChange={(e) => setPromoCode(e.target.value)}
                               className="addOrderForm-promocode-input"
                               placeholder="Promo code"/>
                    </div>

                    <div className="addOrderForm-wish-block">
                        <p className="addOrderForm-wish-title">Wish</p>
                        <textarea value={wish}
                               onChange={(e) => setWish(e.target.value)}
                               className="addOrderForm-wish-input"
                               placeholder="Wish"/>
                    </div>

                    <div className="addOrderForm-confirm-order">
                        <p className="addOrderForm-confirm-order-title">Order total: {totalPrice}$</p>

                        <button className="addOrderForm-submit-button" onClick={submitData}>Submit order</button>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
