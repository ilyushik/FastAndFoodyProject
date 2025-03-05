import "./userInfoOrderTemplate.css"
import button from "../../../images/arrow.png"
import {useCallback, useEffect, useState} from "react";
import axios from "axios";

export default function UserInfoOrderTemplate(props) {

    const purchase = props.purchase

    const [loadedPurchase, setLoadedPurchase] = useState({})

    const fetchPurchaseHandler = useCallback(async () => {
        try {
            const response = await axios.get
            (`${process.env.REACT_APP_BACKEND_LINK}/my-info/orders/${purchase.id}`, {
                // headers: {
                //     'Content-Type': 'application/json',
                //     'Authorization': `Bearer ${localStorage.getItem("token")}`
                // }
                withCredentials: true
            })
            console.log(response.data)
            setLoadedPurchase(response.data)
        } catch (e) {
            console.log(e.response?.data)
        }
    }, [])

    useEffect(() => {
        fetchPurchaseHandler()
    }, [fetchPurchaseHandler])

    return (
        <div className="userInfoOrderTemplate-component" key={purchase.id}>
            <div className="userInfoOrderTemplate-block">
                <div className="userInfoOrderTemplate-info">
                    <p className="userInfoOrderTemplate-info-title">Order:</p>
                    <p className="userInfoOrderTemplate-info-value">№{purchase.id}</p>
                </div>

                <div className="userInfoOrderTemplate-info">
                    <p className="userInfoOrderTemplate-info-title">Status</p>
                    <p className="userInfoOrderTemplate-info-value">{loadedPurchase.status}</p>
                </div>

                <div className="userInfoOrderTemplate-info">
                    <p className="userInfoOrderTemplate-info-title">Total</p>
                    <p className="userInfoOrderTemplate-info-value">{loadedPurchase.sum}$</p>
                </div>

                <div className="userInfoOrderTemplate-button">
                    <button>
                        <img src={button} className="userInfoOrderTemplate-button-icon" />
                    </button>
                </div>
            </div>
        </div>
    )
}