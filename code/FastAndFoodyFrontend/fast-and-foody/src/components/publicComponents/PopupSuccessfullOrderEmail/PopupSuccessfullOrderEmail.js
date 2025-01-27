import "./PopupSuccessfullOrderEmail.css"
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function PopupSuccessfullOrderEmail(props) {

    const navigate = useNavigate();

    const addOrderHandler = async () => {
        try {
            const response = await
                axios.get(`${process.env.REACT_APP_BACKEND_LINK}/purchase/setPerson/${props.purchaseId}`)
            console.log(response.data)
        } catch (e) {
            console.log(e.response?.data)
        }
    }

    return (
        <div>
            <div className="back-popup-successfull-order-email" onClick={(event) =>
            { event.stopPropagation(); props.close(); localStorage.removeItem("order") }}></div>


            <div className="modal-justify-popup-successfull-order-email">
                <div className="modal-screen-popup-successfull-order-email">
                    <button className={`close-button-popup-successfull-order-email`}
                            onClick={(event) =>
                            { event.stopPropagation(); props.close(); navigate('/');
                                localStorage.removeItem("order") }}>&times;</button>

                    <div className="popup-successfull-order-email-block">
                        <p className="popup-successfull-order-email-text">Thanks for your order</p>

                        <p className="popup-successfull-order-email-text">
                            We found an account with the same email. Add your order to this account?</p>

                        <div className="popup-successfull-order-email-buttons">
                            <button className="popup-successfull-order-email-yes-button" onClick={(event) => {
                                event.stopPropagation()
                                addOrderHandler()
                                props.close()
                                localStorage.removeItem("order")
                                navigate('/')
                            }}>Yes</button>

                            <button onClick={(event) =>
                            { event.stopPropagation(); props.close(); navigate('/'); localStorage.removeItem("order") }}
                                    className="popup-successfull-order-email-no-button">No</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}