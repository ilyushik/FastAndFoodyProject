import "./PopupSuccessfullOrder.css"
import {useNavigate} from "react-router-dom";

export default function PopupSuccessfullOrder(props) {

    const navigate = useNavigate();

    return (
        <div>
            <div className="back-popup-successfull-order" onClick={(event) => { event.stopPropagation(); props.close(); navigate('/')}}></div>


            <div className="modal-justify-popup-successfull-order">
                <div className="modal-screen-popup-successfull-order">
                    <button className={`close-button-popup-successfull-order`} onClick={(event) => { event.stopPropagation(); props.close(); navigate('/') }}>&times;</button>

                    <div className="popup-successfull-order-block">
                        <p className="popup-successfull-order-text">Thanks for your order</p>
                    </div>
                </div>
            </div>
        </div>
    )
}