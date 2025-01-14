import "./userInfoOrderTemplate.css"
import button from "../../../images/arrow.png"

export default function UserInfoOrderTemplate() {
    return (
        <div className="userInfoOrderTemplate-component">
            <div className="userInfoOrderTemplate-block">
                <div className="userInfoOrderTemplate-info">
                    <p className="userInfoOrderTemplate-info-title">Order:</p>
                    <p className="userInfoOrderTemplate-info-value">№123456789</p>
                </div>

                <div className="userInfoOrderTemplate-info">
                    <p className="userInfoOrderTemplate-info-title">Status</p>
                    <p className="userInfoOrderTemplate-info-value">In process...</p>
                </div>

                <div className="userInfoOrderTemplate-info">
                    <p className="userInfoOrderTemplate-info-title">Total</p>
                    <p className="userInfoOrderTemplate-info-value">$199.00</p>
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