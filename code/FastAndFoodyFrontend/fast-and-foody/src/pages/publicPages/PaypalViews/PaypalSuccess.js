import Layout from "../../../components/usersComponents/Layout/Layout";
import axios from "axios";
import {useEffect, useState} from "react";
import PopupSuccessfullOrder from "../../../components/publicComponents/PopupSuccessfullOrder/PopupSuccessfullOrder";
import PopupSuccessfullOrderEmail
    from "../../../components/publicComponents/PopupSuccessfullOrderEmail/PopupSuccessfullOrderEmail";

export default function PaypalSuccess() {

    const urlParams = new URLSearchParams(window.location.search);
    const paymentId = urlParams.get('paymentId')
    const payerId = urlParams.get('PayerID')

    const [popupFinishOrderEmailOpen, setPopupFinishOrderEmailOpen] = useState(false);
    const [popupFinishOrderOpen, setPopupFinishOrderOpen] = useState(false);

    const [isFunctionUsed, setIsFunctionUsed] = useState(false);

    const handlePaymentSuccess = async () => {
        setIsFunctionUsed(true);

        try {
            const purchase = localStorage.getItem("purchase");

            const response = await axios.get(
                `${process.env.REACT_APP_BACKEND_LINK}/paypal/success?paymentId=${paymentId}&PayerID=${payerId}`,
                { headers: { 'Content-Type': 'application/json' } }
            );

            console.log(response.data);

            if (response?.data === 'Payment successful') {
                try {
                    const responseAddPurchase = await axios.post(
                        `${process.env.REACT_APP_BACKEND_LINK}/purchase/add`,
                        purchase, { headers: { 'Content-Type': 'application/json' } }
                    );
                    console.log(responseAddPurchase.data);

                    localStorage.removeItem("purchase");
                    localStorage.removeItem("items");

                    if (responseAddPurchase.data?.purchaseId !== null) {
                        localStorage.setItem("order", responseAddPurchase.data?.purchaseId);
                        setPopupFinishOrderEmailOpen(true);
                    } else {
                        setPopupFinishOrderOpen(false);
                    }
                } catch (e) {
                    console.log(e.response?.data);
                }
            }
        } catch (e) {
            console.log(e.response?.data);
        }
    };

    useEffect(() => {
        if (!isFunctionUsed) {
            handlePaymentSuccess();
        }
    }, []);

    return (
        <Layout>
            {popupFinishOrderEmailOpen && <PopupSuccessfullOrder close={() => setPopupFinishOrderEmailOpen(false)} />}
            {popupFinishOrderOpen &&
                <PopupSuccessfullOrderEmail purchaseId={JSON.parse(localStorage.getItem("order"))}
                                            close={() =>
                                                setPopupFinishOrderOpen(false)} />}
            {/*<h1>Successful payment</h1>*/}
            {/*<h1>Thanks for your order</h1>*/}
            {/*<Link to="/" >To main page</Link>*/}
        </Layout>
    )
}