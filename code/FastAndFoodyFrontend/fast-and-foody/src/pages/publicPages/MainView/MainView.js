import {useEffect, useState} from "react";
import axios from "axios";
import UserMainView from "../../userPages/userMainView/UserMainView";
import AdminMainView from "../../adminPages/adminMainView/AdminMainView";
import OwnerMainView from "../../ownerPages/ownerMainView/OwnerMainView";

export default function MainView() {

    const token = localStorage.getItem("token");

    const [user, setUser] = useState(null)

    const fetchUserHandler = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_LINK}/my-info`,
                {withCredentials: true})
            console.log(response.data)
            setUser(response.data)
        } catch (e) {
            console.log(e.response?.data)
        }
    }

    useEffect(() => {
        fetchUserHandler()
    }, [])

    return (
        <div>
            {(token === null || user?.role === 'ROLE_CLIENT') && <>
                <UserMainView/>
            </>}
            {user?.role === 'ROLE_ADMIN' && <>
                <AdminMainView/>
            </>}
            {user?.role === 'ROLE_OWNER' && <>
                <OwnerMainView/>
            </>}
        </div>
    )
}