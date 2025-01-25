import Layout from "../../../components/usersComponents/Layout/Layout";
import axios from "axios";
import {useEffect} from "react";

export default function PaypalSuccess() {

    const urlParams = new URLSearchParams(window.location.search);
    const paymentId = urlParams.get('paymentId')
    const payerId = urlParams.get('PayerID')

    const handlePaymentSuccess = async () => {
        try {
            const purchase = localStorage.getItem("purchase");

            const response = await
                axios.post(`${process.env.REACT_APP_BACKEND_LINK}/paypal/success?paymentId=${paymentId}&PayerID=${payerId}`,
                    purchase, { headers: { 'Content-Type': 'application/json' } })

            console.log(response.data)

            localStorage.removeItem("purchase");
            localStorage.removeItem("items")
        } catch (e) {
            console.log(e.response?.data);
        }
    }

    useEffect(() => {
        handlePaymentSuccess();
    }, [])

    return (
        <Layout>
            <h1>Success payment page</h1>
        </Layout>
    )
}