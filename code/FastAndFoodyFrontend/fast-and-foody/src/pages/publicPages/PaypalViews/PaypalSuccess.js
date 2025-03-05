import Layout from "../../../components/usersComponents/Layout/Layout";
import axios from "axios";
import {useEffect, useRef, useState} from "react";
import PopupSuccessfullOrder from "../../../components/publicComponents/PopupSuccessfullOrder/PopupSuccessfullOrder";
import PopupSuccessfullOrderEmail
    from "../../../components/publicComponents/PopupSuccessfullOrderEmail/PopupSuccessfullOrderEmail";

export default function PaypalSuccess() {

    const urlParams = new URLSearchParams(window.location.search);
    const paymentId = urlParams.get('paymentId')
    const payerId = urlParams.get('PayerID')

    const [popupFinishOrderEmailOpen, setPopupFinishOrderEmailOpen] = useState(false);
    const [popupFinishOrderOpen, setPopupFinishOrderOpen] = useState(false);

    const hasRun = useRef(false);

    const handlePaymentSuccess = async () => {

        try {
            if (hasRun.current) {
                return
            }
            hasRun.current = true;
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

                    if (localStorage.getItem("token") === null) {
                        if (responseAddPurchase.data?.purchaseId !== null) {
                            localStorage.setItem("order", responseAddPurchase.data?.purchaseId);
                            setPopupFinishOrderEmailOpen(true);
                        } else {
                            setPopupFinishOrderOpen(true);
                        }
                    } else {
                        setPopupFinishOrderOpen(true);
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
        handlePaymentSuccess();
    }, []);

    return (
        <Layout>
            {popupFinishOrderOpen && <PopupSuccessfullOrder close={() =>
                setPopupFinishOrderEmailOpen(false)} />}
            {popupFinishOrderEmailOpen &&
                <PopupSuccessfullOrderEmail purchaseId={JSON.parse(localStorage.getItem("order"))}
                                            close={() =>
                                                setPopupFinishOrderOpen(false)} />}
        </Layout>
    )
}