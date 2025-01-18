import "./userInfoView.css"
import Layout from "../../../components/usersComponents/Layout/Layout";
import UserInfoOrderTemplate from "../../../components/usersComponents/userInfoOrderTemplate/userInfoOrderTemplate";
import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function UserInfoView() {

    const navigator = useNavigate();

    const [user, setUser] = useState({});
    const [error, setError] = useState({});
    const [purchases, setPurchases] = useState([]);
    const [activePurchases, setActivePurchases] = useState([]);
    const [finishedPurchases, setFinishedPurchases] = useState([]);

    const navigate = useNavigate();

    const fetchUserHandle = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:8080/my-info`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            })
            console.log(response.data);
            setUser(response.data);
        } catch (e) {
            console.log(e.response.data);
        }
    }, [])

    const fetchPurchasesHandler = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:8080/my-info/orders`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            })
            console.log(response.data);
            setPurchases([])
            setPurchases(response.data);
        } catch (e) {
            console.log(e.response.data)
            setError(e.response.data);
            setPurchases([])
        }
    }, [])

    const fetchActivePurchasesHandler = useCallback(async () => {
        try {
            const response  = await axios.get(`http://localhost:8080/my-info/active-orders`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            })
            setActivePurchases(response.data);
            console.log(response.data);
        } catch (e) {
            console.log(e.response.data)
        }
    }, [])

    const fetchFinishedPurchasesHandler = useCallback(async () => {
        try {
            const response  = await axios.get(`http://localhost:8080/my-info/finished-orders`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            })
            setFinishedPurchases(response.data);
            console.log(response.data);
        } catch (e) {
            console.log(e.response.data)
        }
    }, [])

    useEffect(() => {
        fetchUserHandle();
    }, [fetchUserHandle]);

    useEffect(() => {
        fetchPurchasesHandler();
    }, [fetchPurchasesHandler]);

    useEffect(() => {
        fetchActivePurchasesHandler();
    }, [fetchActivePurchasesHandler]);

    useEffect(() => {
        fetchFinishedPurchasesHandler();
    }, [fetchFinishedPurchasesHandler]);

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/");
    }

    return (
        <Layout>
            <div className="userInfoView-container">
                <div className="userInfoView-justify">
                    <div className="userInfoView-align">
                        <div className="userInfoView-userInfo">
                            <div className="userInfoView-image-block">
                                <img src={user?.image} className="userInfoView-image" />
                            </div>
                            <div className="userInfoView-userInfo-text">
                                <p className="userInfoView-userName">{user.name} {user.surname}</p>
                                <p className="userInfoView-secondary-info">{user.email}</p>
                                <p className="userInfoView-secondary-info">{user.phone}</p>
                                <p className="userInfoView-secondary-info">{user.username}</p>
                            </div>
                        </div>
                        <div className="userInfoView-action-button-block">
                            <button className="userInfoView-action-button" onClick={() => navigator('/my-info/edit')}>Edit profile</button>
                        </div>
                        <div className="userInfoView-action-button-block">
                            <button className="userInfoView-action-button" onClick={logout}>Logout</button>
                        </div>
                        <div className="userInfoView-action-button-block">
                            <button className="userInfoView-action-button">Delete account</button>
                        </div>
                    </div>

                    <div className="userMainView-ordersInfo">
                        {purchases.length > 0 ? (
                            <>
                                {activePurchases.length > 0 && (
                                    <div className="userMainView-ordersInfo-active">
                                        <p className="userMainView-ordersInfo-active-text">Active orders:</p>
                                        <div className="userInfoView-ordersInfo-active-scroll">
                                            <UserInfoOrderTemplate/>
                                        </div>
                                    </div>
                                )}

                                {finishedPurchases.length > 0 && (
                                    <div className="userMainView-ordersInfo-active">
                                        <p className="userMainView-ordersInfo-active-text">Finished orders:</p>
                                        <div className="userInfoView-ordersInfo-active-scroll">
                                            <UserInfoOrderTemplate/>
                                        </div>
                                    </div>
                                )}
                            </>
                        ) : (
                            <p className="error-userPurchases-message">{error.message}</p>
                        )}
                    </div>
                </div>
            </div>

        </Layout>
    )
}