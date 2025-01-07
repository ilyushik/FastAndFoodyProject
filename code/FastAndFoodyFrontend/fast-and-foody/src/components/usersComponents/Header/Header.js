import "./Header.css"
import logo from "../../../images/LogoFull.png"
import responsiveIconFalse from "../../../images/menu.png"
import responsiveIconTrue from "../../../images/close_cross.png"
import {useState} from "react";

export default function Header() {
    const[showNavBar, setShowNavBar] = useState(false)

    const responsive = () => {
        if (showNavBar) {
            return (
                <button className="UserHeader-navbar-responsive" onClick={() => setShowNavBar(false)}>
                    <img className="UserHeader-navbar-response-image" src={responsiveIconTrue}/>
                </button>
            )
        } else {
            return (
                <button className="UserHeader-navbar-responsive" onClick={() => setShowNavBar(true)}>
                    <img className="UserHeader-navbar-response-image" src={responsiveIconFalse}/>
                </button>
            )
        }
    }

    return (
        <div className="UserHeader-container">
            <div className="UserHeader-image-container">
                <img className="UserHeader-image" src={logo}/>
            </div>

            <nav className={`UserHeader-navbar ${showNavBar ? "show-nav" : ""}`}>
                <a className="UserHeader-navbar-button" href="#">Menu</a>
                <a className="UserHeader-navbar-button" href="#">About us</a>
                <a className="UserHeader-navbar-button" href="#">Contacts</a>
                <a className="UserHeader-navbar-button" href="#">Account</a>
                <a className="UserHeader-navbar-button" href="#">Add order</a>
            </nav>

            {responsive()}
        </div>
    )
}